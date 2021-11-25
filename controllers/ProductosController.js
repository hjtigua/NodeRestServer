const { request, response } = require("express");
const Producto = require("../models/producto");

//Paginado total populate
const getProductos = async (req = request, resp = response) => {
  const { limit = 5, from = 0 } = req.query;

  const productos = await Producto.find({ estado: true })
    .populate("usuario", "nombre")
    .populate("categoria", "nombre")
    .limit(Number(limit))
    .skip(Number(from));

  return resp.json({ productos });
};

const obtenerById = async (req = request, resp = response) => {
  const { id } = req.params;

  const producto = await Producto.findById(id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  return resp.json(producto);
};

const createProductos = async (req = request, resp = response) => {
  const { nombre, precio, categoria, descripcion } = req.body;

  const ProductoDB = await Producto.findOne({ nombre });

  if (ProductoDB) {
    return resp.status(400).json({
      msg: `El producto ${ProductoDB.nombre} ya existe`,
    });
  }

  const data = {
    nombre,
    usuario: req.uid,
    precio,
    categoria,
    descripcion,
  };

  const producto = new Producto(data);
  await producto.save();
  resp.status(201).json(producto);
};

const actualizarProducto = async (req = request, resp = response) => {
  const { id } = req.params;
  const { nombre, precio, categoria, descripcion } = req.body;

  const ProductoDB = await Producto.findByIdAndUpdate(
    id,
    { nombre, precio, categoria, descripcion },
    { new: true }
  );

  await ProductoDB.save();
  resp.status(200).json(ProductoDB);
};
const borrarProducto = async (req = request, resp = response) => {
  const { id } = req.params;
  const ProductoDB = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  await ProductoDB.save();
  resp.status(200).json(ProductoDB);
};

module.exports = {
  getProductos,
  createProductos,
  obtenerById,
  actualizarProducto,
  borrarProducto,
};
