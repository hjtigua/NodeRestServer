const { response, request } = require("express");
const usuarioGet = (req = request, res = response) => {
  const query = req.query;
  console.log(query);
  res.json({
    msg: "Get Api controlador",
  });
};

const usuarioPost = (req, res) => {
  const { nombre, edad } = req.body;
  console.log(nombre, edad);
  res.json({
    msg: "post  Api controller",
  });
};

const usuarioPut = (req, res) => {
  const id = req.params.id;
  console.log(id);

  res.json({
    msg: "put Api - controlador",
  });
};

const usuarioPatch = (req, res) => {
  res.json({
    msg: "patch Api - controlador",
  });
};

const usuarioDelete = (req, res) => {
  res.json({
    msg: "Get delete  controlador",
  });
};

module.exports = {
  usuarioGet,
  usuarioPost,
  usuarioPut,
  usuarioPatch,
  usuarioDelete,
};
