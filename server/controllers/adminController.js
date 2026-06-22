const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const { normalizePermissions } = require("../utils/permissionControl");

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
        message: "User already exists",
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
      admin: {
        id: newAdmin.id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
        permissions: newAdmin.permissions,
      },
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
      attributes: ["id", "name", "email", "role", "permissions", "createdAt"],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      message: "Admins fetched successfully",
      admins,
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
      attributes: ["id", "name", "email", "role", "permissions", "createdAt"],
    });

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      message: "Admin fetched successfully",
      admin,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unable to fetch admin",
    });
  }
};

const updateAdminPermissions = async (req, res) => {
  try {
    const adminId = req.params.id;
    const { permissions } = req.body;

    const admin = await userModel.findOne({ where: { id: adminId, role: "admin" } });
    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    admin.permissions = normalizePermissions(permissions);
    await admin.save();

    return res.status(200).json({
      message: "Permissions updated successfully",
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        permissions: admin.permissions,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unable to update permissions",
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
  updateAdminPermissions,
  deleteAdmin,
};
