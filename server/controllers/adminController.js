const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

const allowedRole = ["admin head"];
const allowedAccesses = ["Blogs", "Products", "Clients", "Projects"];

const createAdmin = async (req, res) => {
  try {
    const { name, email, password, role = "admin" } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    if (!allowedRole.includes(role)) {
      return res.status(400).json({
        message: "Invalid role selected",
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
      role,
    });

    return res.status(201).json({
      message: `${role} created successfully`,
      user: {
        id: newAdmin.id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Admin creation failed",
    });
  }
};

module.exports = {
  createAdmin,
};

