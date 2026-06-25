const { blogModel, categoryModel, tagModel, userModel } = require("../models");

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

// Blog form sends tag ids as an array. This makes sure they are numbers and unique.
const normalizeTagIds = (tagIds) => {
  if (!Array.isArray(tagIds)) {
    return [];
  }

  return [...new Set(tagIds.map((id) => Number(id)).filter(Boolean))];
};

// The create/edit form can also send brand new tag names as raw strings.
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
    ...new Map(allCategories.map((c) => [c.id, c])).values(),
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

// Blogs and tags connect through the "BlogTags" join table, so a blog never stores a single tagId.
// Instead we gather all chosen/new tags here and later call blog.setTags(tags).
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

// Category count comes from the BlogCategories many-to-many relation.
const syncCategoryCounts = async (categoryIds) => {
  if (!categoryIds || categoryIds.length === 0) return;

  const uniqueIds = [...new Set(categoryIds.filter(Boolean))];

  await Promise.all(
    uniqueIds.map(async (id) => {
      const category = await categoryModel.findByPk(id);

      if (!category) return;

      const count = await category.countBlogs();

      await category.update({ count });
    })
  );
};

// Tag count comes from the many-to-many relation in BlogTags.
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

// Helper used after create/update so the frontend gets the fully populated blog object.
const fetchBlogById = async (id) => {
  return blogModel.findByPk(id, {
    include: blogInclude,
    order: [[tagModel, "name", "ASC"]],
  });
};

module.exports = {
  blogInclude,
  toSlug,
  resolveCategories,
  resolveTags,
  syncCategoryCounts,
  syncTagCounts,
  fetchBlogById,
};
