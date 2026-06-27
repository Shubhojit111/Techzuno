const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/blogCategoryController");
const {
  isLoggedIn,
  requirePermission,
} = require("../middlewares/authMiddleware");

// router.use();

router.get("/", getAllCategories);
router.post("/", isLoggedIn, requirePermission("blogs"), createCategory);
router.patch("/:id", isLoggedIn, requirePermission("blogs"), updateCategory);
router.delete("/:id", isLoggedIn, requirePermission("blogs"), deleteCategory);

module.exports = router;
