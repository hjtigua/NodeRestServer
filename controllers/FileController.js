const { request, response } = require("express");
const path = require("path");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const { existsSync, unlinkSync } = require("fs");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");

const cargarArchivos = async (req = request, res = response) => {
  let nombre = "";

  try {
    nombre = await subirArchivo(req.files, undefined, "img");
  } catch (error) {
    return res.json({
      msg: error,
    });
  }

  res.json({
    nombre,
  });
};

const actualizarImagen = async (req = request, resp = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return resp.json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }
      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return resp.json({
          msg: `No existe un producto con el id ${id}`,
        });
      }
      break;
    default:
      return resp.status(500).json({
        msg: "Error en colecciones",
      });
  }

  try {
    //Limpiar old img

    if (modelo.imagen) {
      // borrar img from server

      const pathImagen = path.join(
        __dirname,
        "../uploads",
        coleccion,
        modelo.imagen
      );

      if (existsSync(pathImagen)) {
        unlinkSync(pathImagen);
      }
    }

    modelo.imagen = await subirArchivo(req.files, undefined, coleccion);
    await modelo.save();
  } catch (error) {
    return resp.json({
      msg: error,
    });
  }

  resp.json(modelo);
};

const actualizarImagenCloudinary = async (req = request, resp = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return resp.json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }
      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return resp.json({
          msg: `No existe un producto con el id ${id}`,
        });
      }
      break;
    default:
      return resp.status(500).json({
        msg: "Error en colecciones",
      });
  }

  try {
    //Limpiar old img

    if (modelo.imagen) {
      const nombreArr = modelo.imagen.split("/");
      const nombre = nombreArr[nombreArr.length - 1];
      const [public_id] = nombre.split(".");
      cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    modelo.imagen = secure_url;
    await modelo.save();
    resp.json(modelo);
  } catch (error) {
    return resp.json({
      msg: error,
    });
  }
};

const mostrarImagen = async (req = request, resp = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return resp.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }
      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return resp.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }
      break;
    default:
      return resp.status(500).json({
        msg: "Error en colecciones",
      });
  }

  try {
    //Limpiar old img

    if (modelo.imagen) {
      // borrar img from server

      const pathImagen = path.join(
        __dirname,
        "../uploads",
        coleccion,
        modelo.imagen
      );

      if (existsSync(pathImagen)) {
        return resp.sendFile(pathImagen);
      }
    }

    const defaultImage = path.join(__dirname, "../assets/no-image.jpg");
    resp.sendFile(defaultImage);
  } catch (error) {
    return resp.json({
      msg: error,
    });
  }
};

module.exports = {
  cargarArchivos,
  actualizarImagen,
  mostrarImagen,
  actualizarImagenCloudinary,
};
