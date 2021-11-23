const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generate-jwt");
const usuario = require("../models/usuario");

const login = async (req, res = response) => {
  const { correo, password } = req.body;
  try {
    const user = await Usuario.findOne({ correo });

    if (!user)
      return res.status(400).json({
        msg: "Usuario o contraseña incorrectos",
      });

    if (!user.estado)
      return res.status(400).json({
        msg: "Usuario o contraseña incorrectos",
      });

    const isValidPassword = bcryptjs.compareSync(password, user.password);
    if (!isValidPassword)
      return res.status(400).json({
        msg: "Usuario o contraseña incorrectos",
      });

    //Generar el JWT
    const token = await generarJWT(user.id);

    return res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salio mal",
    });
  }
};

module.exports = { login };
