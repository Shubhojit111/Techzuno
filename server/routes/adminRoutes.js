const express = require("express");
const router = express.Router();
const { createAdmin } = require("../controllers/adminController");
const { isLoggedIn, isAdminHead } = require("../middlewares/authMiddleware");

router.post("/create", isLoggedIn, isAdminHead, createAdmin);

module.exports = router;

