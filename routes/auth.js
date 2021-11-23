const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/authController");
const { validarCampos } = require("../middlewares/validator.middleware");

const router = Router();

router.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    validarCampos,
    check("password", "Usuario o password incorrecto").notEmpty(),
    validarCampos,
  ],
  login
);

module.exports = router;
