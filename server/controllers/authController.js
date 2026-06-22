const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { resolveUserPermissions } = require("../utils/permissionControl");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are important",
      });
    }

    const role = "user";

    const isUserAlreadyExists = await userModel.findOne({ where: { email } });
    if (isUserAlreadyExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashPassword,
      role,
      permissions: [],
    });

    const token = jwt.sign(
      {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, //development
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        permissions: resolveUserPermissions(newUser),
      },
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Registration failed", err });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, //development
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: resolveUserPermissions(user),
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Login failed",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: "lax",
    });
    return res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Logout failed",
    });
  }
};

const getAuth = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded)

    const user = await userModel.findOne({ where: { id: decoded.id } });
    req.user = user;

    return res.status(200).json({
      message: "User fetched successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: resolveUserPermissions(user),
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error Occured",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getAuth,
};
