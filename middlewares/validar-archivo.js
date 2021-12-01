const { request, response } = require("express");

const validarArchivo = (req = request, resp = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return resp.status(400).json({
      msg: "No hay archivos en la petición",
    });
  }

  if (!req.files.archivo) {
    return resp.status(400).json({
      msg: "No hay archivos en la petición",
    });
  }

  next();
};

module.exports = {
  validarArchivo,
};
