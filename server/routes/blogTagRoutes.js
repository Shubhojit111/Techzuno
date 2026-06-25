const express = require("express");
const router = express.Router();
const {
  getAllTags,
  createTag,
  updateTag,
  deleteTag,
} = require("../controllers/blogTagController");
const { isLoggedIn, requirePermission } = require("../middlewares/authMiddleware");

router.use(isLoggedIn, requirePermission("blogs"));

router.get("/", getAllTags);
router.post("/", createTag);
router.patch("/:id", updateTag);
router.delete("/:id", deleteTag);

module.exports = router;
