const express = require("express");
const router = express.Router();
const { createBlog, getAllBlogs, getBlogById, updateBlogById, deleteBlogById, } = require("../controllers/blogsController");

router.get("/ah", getAllBlogs);

router.post("/create-blog", createBlog);

router.get("/blogs/:id", getBlogById);

router.put("/blogs/:id", updateBlogById);

router.delete("/blogs/:id", deleteBlogById);

module.exports = router;