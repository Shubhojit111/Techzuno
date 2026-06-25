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

router.use(isLoggedIn, requirePermission("blogs"));

router.post("/", createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.patch("/:id", updateBlogById);
router.delete("/:id", deleteBlogById);

module.exports = router;
