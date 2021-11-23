const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/authController");
const { validarCampos } = require("../middlewares/validator.middleware");

const router = Router();

router.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    check("password", "Usuario o password incorrecto").notEmpty(),
    validarCampos,
  ],
  login
);

router.post(
  "/google",
  [check("id_token", "id_Token es necesario").notEmpty(), validarCampos],
  googleSignIn
);

module.exports = router;
