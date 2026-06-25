const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/blogCategoryController");
const { isLoggedIn, requirePermission } = require("../middlewares/authMiddleware");

router.use(isLoggedIn, requirePermission("blogs"));

router.get("/", getAllCategories);
router.post("/", createCategory);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
