const express = require("express");
const cors = require("cors");
const { usuariosPath } = require("../routes/api");
const { dbConnection } = require("../database/config.db");
class Server {
  constructor() {
    this.app = express();

    //Conectar a base de datos
    this.initDB();

    //Middlewares
    this.middlewares();
    this.routes();
    this.port = process.env.PORT;
  }

  routes() {
    this.app.use(usuariosPath, require("../routes/user"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
  middlewares() {
    this.app.use(cors());
    // Para poder leer un body con formato json
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }
  async initDB() {
    await dbConnection();
  }
}

module.exports = Server;
