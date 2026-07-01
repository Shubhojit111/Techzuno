const express = require("express");
const router = express.Router();
const {
  createAdmin,
  listAdmins,
  getAdminById,
  updateAdminById,
  deleteAdmin,
  listUsers,
} = require("../controllers/adminController");
const { isLoggedIn, isAdminHead, requirePermission } = require("../middlewares/authMiddleware");

router.post("/create", isLoggedIn, isAdminHead, createAdmin);
// router.post("/admins", isLoggedIn, isAdminHead, createAdmin);
router.get("/", isLoggedIn, isAdminHead, listAdmins);
router.get("/users", isLoggedIn, requirePermission("users"), listUsers);
router.get("/admins/:id", isLoggedIn, isAdminHead, getAdminById);
router.patch("/admins/:id", isLoggedIn, isAdminHead, updateAdminById);
router.delete("/admins/:id", isLoggedIn, isAdminHead, deleteAdmin);

module.exports = router;
