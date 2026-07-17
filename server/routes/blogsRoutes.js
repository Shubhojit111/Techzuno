const express = require("express");
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
} = require("../controllers/blogsController");
const { isLoggedIn, requirePermission } = require("../middlewares/authMiddleware");

router.post("/", isLoggedIn, requirePermission("blogs"), createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.patch("/:id", isLoggedIn, requirePermission("blogs"), updateBlogById);
router.delete("/:id", isLoggedIn, requirePermission("blogs"), deleteBlogById);

module.exports = router;
