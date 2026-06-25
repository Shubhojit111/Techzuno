const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { resolveUserPermissions } = require("../utils/permissionControl");

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
    req.permissions = resolveUserPermissions(user);
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

const requirePermission = (permission) => {
  return (req, res, next) => {
    if (req.user?.role === "admin head") {
      return next();
    }

    if (req.user?.role !== "admin") {
      return res.status(403).json({
        message: "Forbidden: admin access only",
      });
    }

    const permissions = Array.isArray(req.permissions) ? req.permissions : [];
    if (!permissions.includes(permission)) {
      return res.status(403).json({
        message: `Forbidden: ${permission} permission required`,
      });
    }

    next();
  };
};

module.exports = {
  isLoggedIn,
  isAdminHead,
  requirePermission,
};
