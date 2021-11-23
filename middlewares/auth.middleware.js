const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validateJWT = async (req = request, resp = response, next) => {
  const token = req.header("x-token");
  if (!token)
    return resp.status(401).json({
      smg: "No hay token en la petición",
    });

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await Usuario.findById(uid);

    if (!user) {
      return resp.status(401).json({
        msg: "Token no válido",
      });
    }

    if (!user.estado) {
      return resp.status(401).json({
        msg: "Token no válido",
      });
    }

    req.user = user;
    req.uid = uid;
    next();
  } catch (error) {
    console.log(error);
    return resp.status(401).json({
      smg: "Token no válido",
    });
  }
};

module.exports = { validateJWT };
