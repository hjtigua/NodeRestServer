const { request, response } = require("express");

const ValidRole = (req = request, resp = response, next) => {
  const { user } = req;
  if (!user)
    return resp.status(500).json({
      msg: "User not found -- role",
    });

  const { role, nombre } = user;
  if (role !== "ADMIN_ROLE") {
    return resp.status(401).json({
      msg: `Usuario ${nombre} no tiene permisos sufucientes`,
    });
  }

  next();
};

const TieneRol = (...roles) => {
  return (req = request, resp = response, next) => {
    const { user } = req;

    if (!user)
      return resp.status(500).json({
        msg: "User not found -- role",
      });

    if (!roles.includes(user.role)) {
      return resp.status(401).json({
        msg: "User not allowing",
      });
    }

    next();
  };
};

module.exports = { ValidRole, TieneRol };
