const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const { normalizePermissions } = require("../utils/permissionControl");

const mapAdminResponse = (admin) => ({
  id: admin.id,
  name: admin.name,
  email: admin.email,
  role: admin.role,
  permissions: admin.permissions,
  profileImage: admin.profileImage,
  phone: admin.phone,
  createdAt: admin.createdAt,
});

const createAdmin = async (req, res) => {
  try {
    const { name, email, password, permissions } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const existingUser = await userModel.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newAdmin = await userModel.create({
      name,
      email,
      password: hashPassword,
      role: "admin",
      permissions: normalizePermissions(permissions),
    });

    return res.status(201).json({
      message: "Admin created successfully",
      admin: mapAdminResponse(newAdmin),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Admin creation failed",
    });
  }
};

const listAdmins = async (req, res) => {
  try {
    const admins = await userModel.findAll({
      where: { role: "admin" },
      attributes: ["id", "name", "email", "role", "permissions", "profileImage", "phone", "createdAt"],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      message: "Admins fetched successfully",
      admins: admins.map(mapAdminResponse),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unable to fetch admins",
    });
  }
};

const getAdminById = async (req, res) => {
  try {
    const adminId = req.params.id;

    const admin = await userModel.findOne({
      where: { id: adminId, role: "admin" },
      attributes: ["id", "name", "email", "role", "permissions", "profileImage", "phone", "createdAt"],
    });

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      message: "Admin fetched successfully",
      admin: mapAdminResponse(admin),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unable to fetch admin",
    });
  }
};

const updateAdminById = async (req, res) => {
  try {
    const adminId = req.params.id;
    const { name, email, phone, profileImage, permissions } = req.body;

    const admin = await userModel.findOne({ where: { id: adminId, role: "admin" } });
    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    const normalizedName = String(name || "").trim();
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const normalizedPhone = phone ? String(phone).trim() : null;
    const normalizedProfileImage = profileImage ? String(profileImage).trim() : null;

    if (!normalizedName || !normalizedEmail) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    const existingUser = await userModel.findOne({ where: { email: normalizedEmail } });
    if (existingUser && existingUser.id !== admin.id) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    admin.name = normalizedName;
    admin.email = normalizedEmail;
    admin.phone = normalizedPhone;
    admin.profileImage = normalizedProfileImage;
    admin.permissions = normalizePermissions(permissions);
    await admin.save();

    return res.status(200).json({
      message: "Admin updated successfully",
      admin: mapAdminResponse(admin),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unable to update admin",
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;

    const admin = await userModel.findOne({ where: { id: adminId, role: "admin" } });
    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    await admin.destroy();

    return res.status(200).json({
      message: "Admin deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unable to delete admin",
    });
  }
};

module.exports = {
  createAdmin,
  listAdmins,
  getAdminById,
  updateAdminById,
  deleteAdmin,
};
