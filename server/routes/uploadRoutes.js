const express = require("express");
const upload = require("../utils/multerConfig");
const { uploadToR2 } = require("../utils/cloudflareR2");
const { isLoggedIn, requirePermission } = require("../middlewares/authMiddleware");

const router = express.Router();

// Upload image route (requires login and blogs permission)
router.post(
  "/image",
  isLoggedIn,
  requirePermission("blogs"),
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Upload to Cloudflare R2
      const imageUrl = await uploadToR2(
        req.file.buffer,
        req.file.mimetype,
        req.file.originalname
      );

      return res.status(201).json({
        message: "Image uploaded successfully",
        url: imageUrl,
      });
    } catch (error) {
      console.error("Upload error:", error);
      return res.status(500).json({ message: "Failed to upload image" });
    }
  }
);

module.exports = router;
