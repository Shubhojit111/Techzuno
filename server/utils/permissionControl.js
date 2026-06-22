const ALLOWED_PERMISSIONS = ["products", "orders", "blogs", "users", "settings"];

const normalizePermissions = (permissions) => {
  if (!Array.isArray(permissions)) {
    return [];
  }

  return [...new Set(permissions)].filter((permission) =>
    ALLOWED_PERMISSIONS.includes(permission),
  );
};

const resolveUserPermissions = (user) => {
  if (!user) {
    return [];
  }

  if (user.role === "admin head") {
    return ALLOWED_PERMISSIONS;
  }

  if (user.role === "admin") {
    return normalizePermissions(user.permissions);
  }

  return [];
};

module.exports = {
  ALLOWED_PERMISSIONS,
  normalizePermissions,
  resolveUserPermissions,
};

