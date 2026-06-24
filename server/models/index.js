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

categoryModel.hasMany(blogModel, {
  foreignKey: "categoryId",
});

blogModel.belongsTo(categoryModel, {
  foreignKey: "categoryId",
});

// One blogModel

// ↓

// Many Tags

// AND

// One tagModel

// ↓

// Many Blogs

blogModel.belongsToMany(tagModel, {
  through: "BlogTags",
  foreignKey: "blogId",
  otherKey: "tagId",
});

tagModel.belongsToMany(blogModel, {
  through: "BlogTags",
  foreignKey: "blogId",
  otherKey: "tagId",
});

module.exports = {
  userModel,
  blogModel,
  categoryModel,
  tagModel,
};
