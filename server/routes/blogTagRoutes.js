const express = require("express");
const router = express.Router();
const {
  getAllTags,
  createTag,
  updateTag,
  deleteTag,
} = require("../controllers/blogTagController");
const { isLoggedIn, requirePermission } = require("../middlewares/authMiddleware");

router.get("/", getAllTags);
router.post("/", isLoggedIn, requirePermission("blogs"), createTag);
router.patch("/:id", isLoggedIn, requirePermission("blogs"), updateTag);
router.delete("/:id", isLoggedIn, requirePermission("blogs"), deleteTag);

module.exports = router;
