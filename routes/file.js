const { Router } = require("express");
const { check } = require("express-validator");
const {
  cargarArchivos,
  actualizarImagen,
  mostrarImagen,
  actualizarImagenCloudinary,
} = require("../controllers/FileController");
const { coleccionesPermitidas } = require("../helpers");
const {
  validateJWT,
  validarCampos,
  TieneRol,
  validarArchivo,
} = require("../middlewares");

const router = Router();

router.post("/", validarArchivo, cargarArchivos);
router.put(
  "/:coleccion/:id",
  [
    validarArchivo,
    check("id", "el id debe ser un id de mongo").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  actualizarImagenCloudinary
);

router.get(
  "/:coleccion/:id",
  [
    check("id", "el id debe ser un id de mongo").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  mostrarImagen
);

module.exports = router;
