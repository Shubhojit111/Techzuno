const { tagModel } = require("../models");
const { toSlug } = require("../utils/blogHelpers");
const { Op } = require("sequelize");

const getAllTags = async (req, res) => {
  try {
    const tags = await tagModel.findAll({
      order: [["name", "ASC"]],
    });

    return res.status(200).json({
      message: "Tags fetched successfully",
      tags,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unable to fetch tags",
    });
  }
};

const createTag = async (req, res) => {
  try {
    const { name, description, slug: customSlug } = req.body;
    if (!name?.trim()) {
      return res.status(400).json({
        message: "Tag name is required",
      });
    }

    const normalizedName = name.trim();

    const slug = toSlug(customSlug || normalizedName);
    const existingTag = await tagModel.findOne({
      where: {
        [Op.or]: [{ slug }, { name: normalizedName }],
      },
    });

    if (existingTag) {
      return res.status(400).json({
        message: "Tag already exists",
      });
    }

    const tag = await tagModel.create({
      name: normalizedName,
      description: description?.trim() || null,
      slug,
    });

    return res.status(201).json({
      message: "Tag created successfully",
      tag,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unable to create tag",
    });
  }
};

const updateTag = async (req, res) => {
  try {
    const { name, description, slug: customSlug } = req.body;
    const tag = await tagModel.findByPk(req.params.id);

    if (!tag) {
      return res.status(404).json({
        message: "Tag not found",
      });
    }

    if (!name?.trim()) {
      return res.status(400).json({
        message: "Tag name is required",
      });
    }

    const normalizedName = name.trim();

    const nextSlug = toSlug(customSlug || normalizedName);
    const duplicateTag = await tagModel.findOne({
      where: {
        [Op.or]: [{ slug: nextSlug }, { name: normalizedName }],
      },
    });

    if (duplicateTag && duplicateTag.id !== tag.id) {
      return res.status(400).json({
        message: "Tag already exists",
      });
    }

    tag.name = normalizedName;
    tag.slug = nextSlug;
    tag.description = description?.trim() || null;
    await tag.save();

    return res.status(200).json({
      message: "Tag updated successfully",
      tag,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unable to update tag",
    });
  }
};

const deleteTag = async (req, res) => {
  try {
    const tag = await tagModel.findByPk(req.params.id);
    if (!tag) {
      return res.status(404).json({
        message: "Tag not found",
      });
    }

    const blogCount = await tag.countBlogs();
    if (blogCount > 0) {
      return res.status(400).json({
        message: "Cannot delete tag linked to blogs",
      });
    }

    await tag.destroy();

    return res.status(200).json({
      message: "Tag deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unable to delete tag",
    });
  }
};

module.exports = {
  getAllTags,
  createTag,
  updateTag,
  deleteTag,
};

