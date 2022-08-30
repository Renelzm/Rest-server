const express = require("express");
const cors = require("cors");
const { dbConnection } = require('../database/configDB')
const morgan = require('morgan');

class Server {

  /**=======================================================================================================================
   * ?                                                   CONSTRUCTOR
   *=======================================================================================================================**/
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';
    this.authPath = '/api/auth';

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
    this.app.use(morgan('tiny'))
  }

    /**=======================================================================================================================
   * ?                                                      ROUTES
   *=======================================================================================================================**/
  routes() {    
    this.app.use(this.authPath, require('../routes/authRuta'));
    this.app.use(this.usuariosPath, require('../routes/usuariosRuta'));
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
