const express = require("express");
const cors = require("cors");
const { usuariosPath } = require("../routes/api");
class Server {
  constructor() {
    this.app = express();
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
}

module.exports = Server;
