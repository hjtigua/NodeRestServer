const { Categoria, Role, Usuario, Producto } = require("../models");

const isValidRole = async (rol = "") => {
  const existRole = await Role.findOne({ rol });
  if (!existRole) {
    throw new Error(`El rol ${rol} no es un rol valido`);
  }
};

const existEmail = async (correo = "") => {
  const existEmail = await Usuario.findOne({ correo });
  if (existEmail) {
    throw new Error(`El correo ${correo} ya esta registrado`);
  }
};

const existUserById = async (id = "") => {
  const existUser = await Usuario.findById(id);
  if (!existUser) {
    throw new Error(`User con id ${id} no encontrado`);
  }
};

const existCategoriaById = async (id = "") => {
  const existCategoria = await Categoria.findOne({ _id: id, estado: true });
  if (!existCategoria) {
    throw new Error(`Categoria con id ${id} no encontrado`);
  }
};

const existProducto = async (id = "") => {
  const existProducto = await Producto.findOne({ _id: id, estado: true });
  if (!existProducto) {
    throw new Error(`Producto con id ${id} no encontrado`);
  }
};

const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
  const exist = colecciones.includes(coleccion);
  if (!exist) {
    throw new Error(`La coleccion ${coleccion} no es permitida`);
  }
  return true;
};

module.exports = {
  isValidRole,
  existEmail,
  existUserById,
  existCategoriaById,
  existProducto,
  coleccionesPermitidas,
};
