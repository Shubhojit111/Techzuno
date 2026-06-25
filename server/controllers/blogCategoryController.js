const { categoryModel } = require("../models");
const { toSlug } = require("../utils/blogHelpers");
const { Op } = require("sequelize");

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.findAll({
      order: [["name", "ASC"]],
    });

    return res.status(200).json({
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unable to fetch categories",
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, description, slug: customSlug } = req.body;
    if (!name?.trim()) {
      return res.status(400).json({
        message: "Category name is required",
      });
    }

    const normalizedName = name.trim();

    // We still use slug for the main lookup because it is the URL-safe unique value,
    // but we also protect against duplicate display names for clearer admin behavior.
    const slug = toSlug(customSlug || normalizedName);
    const existingCategory = await categoryModel.findOne({
      where: {
        [Op.or]: [{ slug }, { name: normalizedName }],
      },
    });

    if (existingCategory) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }

    const category = await categoryModel.create({
      name: normalizedName,
      description: description?.trim() || null,
      slug,
    });

    return res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unable to create category",
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name, description, slug: customSlug } = req.body;
    const category = await categoryModel.findByPk(req.params.id);
    if (!name?.trim()) {
      return res.status(400).json({
        message: "Category name is required",
      });
    }

    const normalizedName = name.trim();

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const nextSlug = toSlug(customSlug || normalizedName);
    const duplicateCategory = await categoryModel.findOne({
      where: {
        [Op.or]: [{ slug: nextSlug }, { name: normalizedName }],
      },
    });

    if (duplicateCategory && duplicateCategory.id !== category.id) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }

    category.name = normalizedName;
    category.slug = nextSlug;
    category.description = description?.trim() || null;
    await category.save();

    return res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unable to update category",
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await categoryModel.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const blogCount = await category.countBlogs();

    if (blogCount > 0) {
      return res.status(400).json({
        message: "Cannot delete category linked to blogs",
      });
    }

    await category.destroy();

    return res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Unable to delete category",
    });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
