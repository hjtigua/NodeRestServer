const { Router } = require("express");
const { check } = require("express-validator");
const {
  login,
  googleSignIn,
  renovarToken,
} = require("../controllers/authController");
const { validarCampos, validateJWT } = require("../middlewares");

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

router.get("/", validateJWT, renovarToken);

module.exports = router;
