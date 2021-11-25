const { request, response } = require("express");
const Categoria = require("../models/categoria");

//Paginado total populate
const getCategorias = async (req = request, resp = response) => {
  const { limit = 5, from = 0 } = req.query;

  const categorias = await Categoria.find({ estado: true })
    .populate("usuario", "nombre")
    .limit(Number(limit))
    .skip(Number(from));

  return resp.json({ categorias });
};

const obtenerById = async (req = request, resp = response) => {
  const { id } = req.params;

  const categoria = await Categoria.findById(id).populate("usuario", "nombre");

  return resp.json(categoria);
};

const createCategorias = async (req = request, resp = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return resp.status(400).json({
      msg: `La categoria ${categoriaDB.nombre} ya existe`,
    });
  }

  const data = {
    nombre,
    usuario: req.uid,
  };

  const categoria = new Categoria(data);
  await categoria.save();
  resp.status(201).json(categoria);
};

const actualizarCategoria = async (req = request, resp = response) => {
  const { id } = req.params;
  const nombre = req.body.nombre.toUpperCase();
  const categoriaDB = await Categoria.findByIdAndUpdate(
    id,
    { nombre },
    { new: true }
  );

  await categoriaDB.save();
  resp.status(200).json(categoriaDB);
};
const borrarCategoria = async (req = request, resp = response) => {
  const { id } = req.params;
  const categoriaDB = await Categoria.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  await categoriaDB.save();
  resp.status(200).json(categoriaDB);
};

module.exports = {
  getCategorias,
  createCategorias,
  obtenerById,
  actualizarCategoria,
  borrarCategoria,
};
