const auhtMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/validar-roles");
const checkErrorsMiddeware = require("../middlewares/validator.middleware");
const validarArchivo = require("../middlewares/validar-archivo");

module.exports = {
  ...auhtMiddleware,
  ...adminMiddleware,
  ...checkErrorsMiddeware,
  ...validarArchivo,
};
