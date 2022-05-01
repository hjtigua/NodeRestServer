const express = require("express");
const cors = require("cors");
const {
  usuariosPath,
  authPath,
  categoriasPath,
  productosPath,
  buscarPath,
  filePath,
} = require("../routes/api");
const { dbConnection } = require("../database/config.db");
const fileUpload = require("express-fileupload");
const { socketController } = require("../sockets/SocketController");
class Server {
  constructor() {
    this.app = express();

    //Conectar a base de datos
    this.initDB();

    //Middlewares
    this.middlewares();
    this.routes();
    this.port = process.env.PORT;
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);

    //Socket
    this.sockets();
  }

  routes() {
    this.app.use(authPath, require("../routes/auth"));
    this.app.use(usuariosPath, require("../routes/user"));
    this.app.use(categoriasPath, require("../routes/categorias"));
    this.app.use(productosPath, require("../routes/productos"));
    this.app.use(buscarPath, require("../routes/buscar"));
    this.app.use(filePath, require("../routes/file"));
  }

  sockets() {
    this.io.on("connection", (socket) => socketController(socket, this.io));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
  middlewares() {
    this.app.use(cors());
    // Para poder leer un body con formato json
    this.app.use(express.json());
    this.app.use(express.static("public"));

    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }
  async initDB() {
    await dbConnection();
  }
}

module.exports = Server;
