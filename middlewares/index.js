const auhtMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/validar-roles");
const checkErrorsMiddeware = require("../middlewares/validator.middleware");

module.exports = {
  ...auhtMiddleware,
  ...adminMiddleware,
  ...checkErrorsMiddeware,
};
