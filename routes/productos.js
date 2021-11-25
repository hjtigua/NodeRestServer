const { Router } = require("express");
const { check } = require("express-validator");
const {
  getProductos,
  createProductos,
  obtenerById,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/ProductosController");
const {
  existProducto,
  existCategoriaById,
} = require("../helpers/db-validators");
const { validateJWT, validarCampos, TieneRol } = require("../middlewares");

const router = Router();

router.get("/", getProductos);

router.get(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existProducto),
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
    check("categoria", "La categoria es requerida").notEmpty(),
    check("categoria", "No es un id válido").isMongoId(),
    check("categoria").custom(existCategoriaById),
    validarCampos,
  ],
  createProductos
);

//Privado con token valido
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existProducto),
    check("nombre", "El campo nombre es requerido").notEmpty(),
    check("categoria", "La categoria es requerida").notEmpty(),
    check("categoria", "No es un id válido").isMongoId(),
    check("categoria").custom(existCategoriaById),
    validarCampos,
  ],
  actualizarProducto
);

//Solo si es admin
router.delete(
  "/:id",
  [
    validateJWT,
    TieneRol("ADMIN_ROLE"),
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existProducto),
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;
