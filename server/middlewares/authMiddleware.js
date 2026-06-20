const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ where: { id: decoded.id } });

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

const isAdminHead = (req, res, next) => {
  if (req.user?.role !== "admin head") {
    return res.status(403).json({
      message: "Forbidden: admin head access only",
    });
  }

  next();
};

module.exports = {
  isLoggedIn,
  isAdminHead,
};

