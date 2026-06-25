const userModel = require("./userModel");
const blogModel = require("./blogsModel");
const categoryModel = require("./blogsCategoryModel");
const tagModel = require("./blogsTagModel");

// One userModel

// ↓

// Many Blogs

userModel.hasMany(blogModel, {
  foreignKey: "userId",
});

blogModel.belongsTo(userModel, {
  foreignKey: "userId",
});

// One categoryModel

// ↓

// Many Blogs

blogModel.belongsToMany(categoryModel, {
  through: "BlogCategories",
  foreignKey: "blogId",
  otherKey: "categoryId",
});

categoryModel.belongsToMany(blogModel, {
  through: "BlogCategories",
  foreignKey: "categoryId",
  otherKey: "blogId",
});

// One blogModel

// ↓

// Many Tags

// AND

// One tagModel

// ↓

// Many Blogs

// A blog can have many tags and a tag can belong to many blogs.
// Sequelize stores that relation in the "BlogTags" join table:
// BlogTags.blogId -> Blog.id
// BlogTags.tagId  -> Tag.id
blogModel.belongsToMany(tagModel, {
  through: "BlogTags",
  foreignKey: "blogId",
  otherKey: "tagId",
});

tagModel.belongsToMany(blogModel, {
  through: "BlogTags",
  foreignKey: "tagId",
  otherKey: "blogId",
});

module.exports = {
  userModel,
  blogModel,
  categoryModel,
  tagModel,
};
