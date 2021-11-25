const { Router } = require("express");
const { check } = require("express-validator");
const {
  getCategorias,
  createCategorias,
  obtenerById,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/CategoriasController");
const { existCategoriaById } = require("../helpers/db-validators");
const { validateJWT, validarCampos, TieneRol } = require("../middlewares");

const router = Router();

router.get("/", [], getCategorias);

router.get(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existCategoriaById),
    validarCampos,
  ],
  obtenerById
);

//Token valido.
router.post(
  "/",
  [
    validateJWT,
    check("nombre", "El campo nombre es requerido").notEmpty(),
    validarCampos,
  ],
  createCategorias
);

//Privado con token valido
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existCategoriaById),
    check("nombre", "El campo nombre es requerido").notEmpty(),
    validarCampos,
  ],
  actualizarCategoria
);

//Solo si es admin
router.delete(
  "/:id",
  [
    validateJWT,
    TieneRol("ADMIN_ROLE"),
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existCategoriaById),
    validarCampos,
  ],
  borrarCategoria
);

module.exports = router;
