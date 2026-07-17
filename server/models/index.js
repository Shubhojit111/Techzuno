const userModel = require("./userModel");
const blogModel = require("./blogsModel");
const categoryModel = require("./blogsCategoryModel");
const tagModel = require("./blogsTagModel");

// One userModel -> Many Blogs
userModel.hasMany(blogModel, { foreignKey: "userId" });
blogModel.belongsTo(userModel, { foreignKey: "userId" });

// Many-to-Many Blogs ↔ Categories
blogModel.belongsToMany(categoryModel, { through: "BlogCategories", foreignKey: "blogId", otherKey: "categoryId" });
categoryModel.belongsToMany(blogModel, { through: "BlogCategories", foreignKey: "categoryId", otherKey: "blogId" });

// Many-to-Many Blogs ↔ Tags
blogModel.belongsToMany(tagModel, { through: "BlogTags", foreignKey: "blogId", otherKey: "tagId" });
tagModel.belongsToMany(blogModel, { through: "BlogTags", foreignKey: "tagId", otherKey: "blogId" });

module.exports = {
  userModel,
  blogModel,
  categoryModel,
  tagModel,
};
