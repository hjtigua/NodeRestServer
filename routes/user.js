const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuarioGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
} = require("../controllers/UserController");
const {
  isValidRole,
  existEmail,
  existUserById,
} = require("../helpers/db-validators");

// const { validateJWT } = require("../middlewares/auth.middleware");
// const { TieneRol } = require("../middlewares/validar-roles");
// const { validarCampos } = require("../middlewares/validator.middleware");

const { validateJWT, TieneRol, validarCampos } = require("../middlewares");

const router = Router();

router.get("/", usuarioGet);

router.post(
  "/",
  [
    check("nombre", "El campo nombre es obligatorio").not().isEmpty(),
    check(
      "password",
      "El campo password es obligatorio y debe contener más de 6 letras"
    ).isLength({ min: 6 }),
    check("role").custom(isValidRole),
    check("correo", "Debe ser un correo válido").isEmail(),
    check("correo").custom(existEmail),
    validarCampos,
  ],
  usuarioPost
);
//check("role", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),

router.put(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existUserById),
    check("role").custom(isValidRole),
    validarCampos,
  ],
  usuarioPut
);

router.delete(
  "/:id",
  [
    validateJWT,
    // ValidRole,
    TieneRol("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existUserById),
    validarCampos,
  ],
  usuarioDelete
);

module.exports = router;
