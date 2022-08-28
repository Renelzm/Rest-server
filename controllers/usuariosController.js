const { response, request } = require("express");
const Usuario = require("../models/usuarioModel");
const bcryptjs = require("bcryptjs");


/**-----------------------------------------------------------------------------------------------------------------------
 **                                                 GET - Usuarios
 * QUERYEJEMPLO = http://localhost:8080/api/usuarios/?limite=3&desde=4
 *-----------------------------------------------------------------------------------------------------------------------**/


const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query

  // const usuarios = await Usuario.find({ estado:true})
  // .limit(limite)
  // .skip(desde);
  // const totalDeRegistros = await Usuario.countDocuments({estado:true});
  
  /*
  Código Optimizado => Corre funciones al mismo tiempo => Con desestructuraxión de arreglos []
  */
  const [totalDeRegistros, usuarios] = await Promise.all([
    Usuario.countDocuments({estado:true}),
    Usuario.find({ estado:true})
        .limit(limite)
        .skip(desde)
  ])
  res.json({
    totalDeRegistros,
    usuarios
  });
};

const usuarioGet = async (req = request, res = response) => {
  const id = req.params.id;


  const usuarioEncontrado= await  Usuario.findById(id)
    
  res.json({
    usuarioEncontrado
  });
};

/**-----------------------------------------------------------------------------------------------------------------------
 **                                                 POST - Usuarios
 *-----------------------------------------------------------------------------------------------------------------------**/


const usuariosPost = async (req, res) => {
  const { nombre, correo, password, rol, google } = req.body;
  const usuarioPost = new Usuario({
    nombre,
    correo,
    password,
    rol,
    google,
  });

  // Encriptar contraseña
  const salt = bcryptjs.genSaltSync();
  usuarioPost.password = bcryptjs.hashSync(password, salt);

  // Guardar en BD
  await usuarioPost.save();

  res.json({
    usuarioPost,
  });
};

/**-----------------------------------------------------------------------------------------------------------------------
 **                                                 PUT - Usuarios
 *-----------------------------------------------------------------------------------------------------------------------**/

const usuariosPut = async (req, res = response) => {
  const id = req.params.id;

  const { _id, password, google, correo, ...resto } = req.body;

  // TODO VALIDAR EN DB
  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  console.log(resto, id);
  const usuarioPut = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    usuarioPut,
  });
};

/**-----------------------------------------------------------------------------------------------------------------------
 **                                                 DELETE - Usuarios
 *-----------------------------------------------------------------------------------------------------------------------**/
const usuariosDelete = async (req, res = response) => {
  const id = req.params.id;
  
  // Borrado completo
  //  const usuarioDelete = await Usuario.findByIdAndDelete(id);

    const usuarioDesactivado = await Usuario.findByIdAndUpdate(id, {estado: false});
  res.json({
    // usuarioDelete,
    usuarioDesactivado,
    msg: "usuario borrado"
  });
};

/**-----------------------------------------------------------------------------------------------------------------------
 **                                                 PATCH - Usuarios
 *-----------------------------------------------------------------------------------------------------------------------**/

const usuariosPatch = (req, res = response) => {
  res.json({
    Saludo: "Hola",
    msg: "Patch API - controlador",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
  usuarioGet
};
