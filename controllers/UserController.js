const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const usuarioGet = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ estado: true }),
    Usuario.find({ estado: true }).limit(Number(limit)).skip(Number(from)),
  ]);

  res.json({ total, usuarios });
};

const usuarioPost = async (req, res = response) => {
  const { nombre, correo, password, role } = req.body;
  const usuario = new Usuario({
    nombre,
    correo,
    password,
    role,
  });

  //HASH de password
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //Save db
  await usuario.save();
  res.json({
    msg: "Usuario creado correctamente",
    usuario,
  });
};

const usuarioPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...user } = req.body;

  if (password) {
    //HASH de password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, user);

  res.json(usuario);
};

const usuarioDelete = async (req, res = response) => {
  const { uid, user } = req;

  const { id } = req.params;
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  res.json({
    usuario,
  });
};

module.exports = {
  usuarioGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
};
