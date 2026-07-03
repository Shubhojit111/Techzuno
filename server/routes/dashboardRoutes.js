const express = require("express");
const { getDashboardStats } = require("../controllers/dashboardController");
const { isLoggedIn } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/stats", isLoggedIn, getDashboardStats);

module.exports = router;
