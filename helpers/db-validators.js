const Role = require("../models/role");
const Usuario = require("../models/usuario");

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

module.exports = {
  isValidRole,
  existEmail,
  existUserById,
};
