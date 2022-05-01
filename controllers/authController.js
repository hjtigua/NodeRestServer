const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generate-jwt");
const usuario = require("../models/usuario");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async (req = request, resp = response) => {
  const { id_token } = req.body;
  try {
    const { nombre, img, correo } = await googleVerify(id_token);
    let usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      const data = {
        nombre,
        correo,
        password: ":P",
        img,
        google: true,
        role: "USER_ROLE",
      };
      usuario = new Usuario(data);
      await usuario.save();
    }

    if (!usuario.estado) {
      return resp.status(401).json({
        msg: "Not allowed",
      });
    }

    const token = await generarJWT(usuario.id);

    resp.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({
      msg: "Algo salio mal",
    });
  }
};

const renovarToken = async (req, resp = response) => {
  const { user } = req;

  const token = await generarJWT(user.id);

  resp.json({
    user,
    token,
  });
};

module.exports = { login, googleSignIn, renovarToken };
