const express = require("express");
const router = express.Router();
const {
  createAdmin,
  listAdmins,
  getAdminById,
  updateAdminPermissions,
  deleteAdmin,
} = require("../controllers/adminController");
const { isLoggedIn, isAdminHead } = require("../middlewares/authMiddleware");

router.post("/create", isLoggedIn, isAdminHead, createAdmin);
// router.post("/admins", isLoggedIn, isAdminHead, createAdmin);
router.get("/admins", isLoggedIn, isAdminHead, listAdmins);
router.get("/admins/:id", isLoggedIn, isAdminHead, getAdminById);
router.patch(
  "/admins/:id/permissions",
  isLoggedIn,
  isAdminHead,
  updateAdminPermissions,
);
router.delete("/admins/:id", isLoggedIn, isAdminHead, deleteAdmin);

module.exports = router;
