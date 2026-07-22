const { blogModel, categoryModel, tagModel, userModel } = require("../models");
const { repairBrokenPunctuation, repairBlogHtml } = require("./textRepair");

// Shared include config so every blog read returns its category, tags and author.
const blogInclude = [
  {
    model: categoryModel,
    attributes: ["id", "name", "slug"],
    through: { attributes: [] },
  },
  {
    model: tagModel,
    attributes: ["id", "name", "slug"],
    through: { attributes: [] },
  },
  {
    model: userModel,
    attributes: ["id", "name", "email"],
  },
];

// Convert display text into a URL-safe value we can store as slug.
const toSlug = (value = "") =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const normalizeTagIds = (tagIds) => {
  if (!Array.isArray(tagIds)) {
    return [];
  }

  return [...new Set(tagIds.map((id) => Number(id)).filter(Boolean))];
};

const normalizeStringList = (values) => {
  if (!Array.isArray(values)) {
    return [];
  }

  return [
    ...new Set(
      values.map((value) => String(value || "").trim()).filter(Boolean),
    ),
  ];
};

const resolveCategories = async ({ categoryIds, newCategoryNames }) => {
  const normalizedCategoryIds = Array.isArray(categoryIds)
    ? [...new Set(categoryIds.map(Number).filter(Boolean))]
    : [];

  const normalizedNewCategoryNames = normalizeStringList(newCategoryNames);

  const existingCategories = normalizedCategoryIds.length
    ? await categoryModel.findAll({
        where: {
          id: normalizedCategoryIds,
        },
      })
    : [];

  if (existingCategories.length !== normalizedCategoryIds.length) {
    throw new Error("One or more categories are invalid");
  }

  const createdCategories = [];

  for (const categoryName of normalizedNewCategoryNames) {
    const slug = toSlug(categoryName);

    let category = await categoryModel.findOne({
      where: { slug },
    });

    if (!category) {
      category = await categoryModel.create({
        name: categoryName,
        slug,
        description: null,
      });
    }

    createdCategories.push(category);
  }

  const allCategories = [...existingCategories, ...createdCategories];
  const uniqueCategories = [
    ...new Map(allCategories.map((category) => [category.id, category])).values(),
  ];

  if (uniqueCategories.length === 0) {
    const defaultCategoryName = "Uncategorized";
    const defaultCategorySlug = toSlug(defaultCategoryName);

    let uncategorizedCategory = await categoryModel.findOne({
      where: { slug: defaultCategorySlug },
    });

    if (!uncategorizedCategory) {
      uncategorizedCategory = await categoryModel.findOne({
        where: { name: defaultCategoryName },
      });
    }

    if (!uncategorizedCategory) {
      uncategorizedCategory = await categoryModel.create({
        name: defaultCategoryName,
        slug: defaultCategorySlug,
        description: null,
      });
    }

    return [uncategorizedCategory];
  }

  return uniqueCategories;
};

const resolveTags = async ({ tagIds, newTagNames }) => {
  const normalizedTagIds = normalizeTagIds(tagIds);
  const normalizedNewTagNames = normalizeStringList(newTagNames);

  const existingTags = normalizedTagIds.length
    ? await tagModel.findAll({ where: { id: normalizedTagIds } })
    : [];

  if (existingTags.length !== normalizedTagIds.length) {
    throw new Error("One or more tags are invalid");
  }

  const createdOrFoundTags = [];
  for (const tagName of normalizedNewTagNames) {
    const slug = toSlug(tagName);
    let tag = await tagModel.findOne({ where: { slug } });

    if (!tag) {
      tag = await tagModel.create({
        name: tagName,
        slug,
        description: null,
      });
    }

    createdOrFoundTags.push(tag);
  }

  const allTags = [...existingTags, ...createdOrFoundTags];
  const uniqueTags = [...new Map(allTags.map((tag) => [tag.id, tag])).values()];

  return uniqueTags;
};

const syncCategoryCounts = async (categoryIds) => {
  if (!categoryIds || categoryIds.length === 0) return;

  const uniqueIds = [...new Set(categoryIds.filter(Boolean))];

  await Promise.all(
    uniqueIds.map(async (id) => {
      const category = await categoryModel.findByPk(id);

      if (!category) return;

      const count = await category.countBlogs();

      await category.update({ count });
    }),
  );
};

const syncTagCounts = async (tagIds) => {
  const uniqueIds = [...new Set((tagIds || []).filter(Boolean))];
  await Promise.all(
    uniqueIds.map(async (tagId) => {
      const tag = await tagModel.findByPk(tagId);
      if (!tag) return;
      const count = await tag.countBlogs();
      await tag.update({ count });
    }),
  );
};

const serializeBlog = (blog) => {
  if (!blog) return null;

  const plainBlog = typeof blog.get === "function" ? blog.get({ plain: true }) : blog;
  const title = repairBrokenPunctuation(plainBlog.title || "");

  return {
    ...plainBlog,
    slug: toSlug(plainBlog.slug || title || String(plainBlog.id || "")),
    title,
    content: repairBlogHtml(plainBlog.content || ""),
  };
};

const fetchBlogById = async (id) => {
  const blog = await blogModel.findByPk(id, {
    include: blogInclude,
    order: [[tagModel, "name", "ASC"]],
  });

  return serializeBlog(blog);
};

const fetchBlogByIdentifier = async (identifier) => {
  const normalizedIdentifier = String(identifier || "").trim();
  const numericId = Number(normalizedIdentifier);

  if (Number.isInteger(numericId) && numericId > 0) {
    return fetchBlogById(numericId);
  }

  const blogs = await blogModel.findAll({
    include: blogInclude,
    order: [["createdAt", "DESC"]],
  });

  return blogs
    .map(serializeBlog)
    .find((blog) => blog.slug === normalizedIdentifier) || null;
};

module.exports = {
  blogInclude,
  toSlug,
  resolveCategories,
  resolveTags,
  syncCategoryCounts,
  syncTagCounts,
  serializeBlog,
  fetchBlogById,
  fetchBlogByIdentifier,
};