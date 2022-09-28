const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/configDB");
const morgan = require("morgan");
const fileUpload = require("express-fileUpload");


class Server {
  /**=======================================================================================================================
   * ?                                                   CONSTRUCTOR
   *=======================================================================================================================**/
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth:          "/api/auth",
      usuarios:      "/api/usuarios",
      categorias:    "/api/categorias",
      productos:     "/api/productos",
      buscar:        "/api/buscar",
      uploads:        "/api/uploads",
    };

    // Conectar a base de datos
    this.conectarDB();
    // Middlewares
    this.middlewares();
    // Rutas de mi app
    this.routes();
  }
  /**=======================================================================================================================
   * ?                                              CONEXIÓN BASE DE DATOS
   *=======================================================================================================================**/
  async conectarDB() {
    await dbConnection();
  }

  /**=======================================================================================================================
   * ?                                              MIDDLEWARES FOR ALL APP
   *=======================================================================================================================**/

  middlewares() {
    // Directorio público
    this.app.use(express.static("public"));
    // Cors
    this.app.use(cors());

    // Parseo y lectura de body
    this.app.use(express.json());
    // morgan para leer Peticiones
    this.app.use(morgan("tiny"));
    //manejar la carga de archivos
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      // Este ultimo genera la carpeta en caso de especificart
      createParentPath: true
  }));
  }

  /**=======================================================================================================================
   * ?                                                      ROUTES
   *=======================================================================================================================**/
  routes() {
    this.app.use(this.paths.auth, require("../routes/authRuta"));
    this.app.use(this.paths.usuarios, require("../routes/usuariosRuta"));
    this.app.use(this.paths.categorias, require("../routes/categoriasRuta"));
    this.app.use(this.paths.productos, require("../routes/productosRuta"));
    this.app.use(this.paths.buscar, require("../routes/buscar"));
    this.app.use(this.paths.uploads, require("../routes/uploadsRuta"));
  }
  /**=======================================================================================================================
   * ?                                                       PORT
   *=======================================================================================================================**/
  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en", this.port);
    });
  }
}

module.exports = Server;
