const { blogModel, categoryModel, tagModel } = require("../models");
const {
  blogInclude,
  resolveCategories,
  resolveTags,
  syncCategoryCounts,
  syncTagCounts,
  fetchBlogById,
  fetchBlogByIdentifier,
  serializeBlog,
} = require("../utils/blogHelpers");

const createBlog = async (req, res) => {
  try {
    const {
      title,
      content,
      blogImage,
      categoryIds,
      tagIds,
      newCategoryNames,
      newTagNames,
    } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    // Resolve categories & tags
    const categories = await resolveCategories({
      categoryIds,
      newCategoryNames,
    });

    const tags = await resolveTags({
      tagIds,
      newTagNames,
    });

    // Create blog
    const blog = await blogModel.create({
      title: title.trim(),
      content: content.trim(),
      blogImage: blogImage?.trim() || null,
      status: "published",
      userId: req.user.id,
    });

    // Attach categories
    await blog.setCategories(categories);

    // Attach tags
    await blog.setTags(tags);

    // Update counts
    await syncCategoryCounts(categories.map((category) => category.id));
    await syncTagCounts(tags.map((tag) => tag.id));

    // Return complete blog
    const createdBlog = await fetchBlogById(blog.id);

    return res.status(201).json({
      message: "Blog created successfully",
      blog: createdBlog,
    });
  } catch (error) {
    console.log(error);

    const knownErrors = [
      "One or more categories are invalid",
      "At least one category is required",
      "One or more tags are invalid",
    ];

    return res.status(400).json({
      message: error.message,
    });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.findAll({
      include: blogInclude,
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      message: "Blogs fetched successfully",
      blogs: blogs.map(serializeBlog),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unable to fetch blogs",
    });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await fetchBlogByIdentifier(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      message: "Blog fetched successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unable to fetch blog",
    });
  }
};

const updateBlogById = async (req, res) => {
  try {
    const {
      title,
      content,
      blogImage,
      categoryIds,
      tagIds,
      newCategoryNames,
      newTagNames,
    } = req.body;
    console.log(req.body);
    const blog = await blogModel.findByPk(req.params.id, {
      include: [
        {
          model: categoryModel,
          attributes: ["id"],
          through: { attributes: [] },
        },
        {
          model: tagModel,
          attributes: ["id"],
          through: { attributes: [] },
        },
      ],
    });

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    // Store previous ids so we can recalculate counts
    const previousCategoryIds = blog.Categories.map((category) => category.id);

    const previousTagIds = blog.Tags.map((tag) => tag.id);

    // Update blog fields
    if (title !== undefined) {
      blog.title = title.trim();
    }

    if (content !== undefined) {
      blog.content = content.trim();
    }

    if (blogImage !== undefined) {
      blog.blogImage = blogImage ? blogImage.trim() : null;
    }

    if (!blog.title || !blog.content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    await blog.save();

    // Update categories
    if (categoryIds !== undefined || newCategoryNames !== undefined) {
      const categories = await resolveCategories({
        categoryIds,
        newCategoryNames,
      });

      await blog.setCategories(categories);

      await syncCategoryCounts([
        ...previousCategoryIds,
        ...categories.map((category) => category.id),
      ]);
    }

    // Update tags
    if (tagIds !== undefined || newTagNames !== undefined) {
      const tags = await resolveTags({
        tagIds,
        newTagNames,
      });

      await blog.setTags(tags);

      await syncTagCounts([...previousTagIds, ...tags.map((tag) => tag.id)]);
    }

    const updatedBlog = await fetchBlogById(blog.id);

    return res.status(200).json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.log(error);

    const knownErrors = [
      "One or more categories are invalid",
      "At least one category is required",
      "One or more tags are invalid",
      "At least one tag is required",
    ];

    return res.status(400).json({
      message: knownErrors.includes(error.message)
        ? error.message
        : "Unable to update blog",
    });
  }
};

const deleteBlogById = async (req, res) => {
  try {
    const blog = await blogModel.findByPk(req.params.id, {
      include: [
        {
          model: categoryModel,
          attributes: ["id"],
          through: { attributes: [] },
        },
        {
          model: tagModel,
          attributes: ["id"],
          through: { attributes: [] },
        },
      ],
    });

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    // Store current categories & tags before deleting
    const categoryIds = blog.Categories.map((category) => category.id);

    const tagIds = blog.Tags.map((tag) => tag.id);

    // Remove relationships
    await blog.setCategories([]);
    await blog.setTags([]);

    // Delete blog
    await blog.destroy();

    // Update counts
    await syncCategoryCounts(categoryIds);
    await syncTagCounts(tagIds);

    return res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Unable to delete blog",
    });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
};
