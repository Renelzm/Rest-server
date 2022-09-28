const Role = require('../models/roleModel');
const Usuario = require("../models/usuarioModel");
const {Categoria, Producto} = require("../models/");

/**-----------------------------------------------------------------------------------------------------------------------
 *?                                                 Validación de rol 
 *-----------------------------------------------------------------------------------------------------------------------**/
const esRolValido =  async (rol = "") => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol) {
      throw new Error(`El rol ${ rol } no esta registrado como una entrada válida`)
    }
  }

/**-----------------------------------------------------------------------------------------------------------------------
 *?                                                 Existe ya el correo? 
 *-----------------------------------------------------------------------------------------------------------------------**/
  const existeEmail = async(correo = "") => {
  const encuentraEmail = await Usuario.findOne({
      correo,
    });
    if (encuentraEmail) {
        throw new Error(`El correo ${ correo } ya esta registrado`)
      };
    }

  /**-----------------------------------------------------------------------------------------------------------------------
 *?                                                 Existe el id del usuario? 
 *-----------------------------------------------------------------------------------------------------------------------**/

 const exiteUsuarioPorId = async ( id ) => {
  const encuentraId = await Usuario.findById(id);
  if (!encuentraId) {
    throw new Error(`este id: ${id} no se encuentra`)
  }
 }

 const existeCategoriaPorId = async (id) => {
  const encuentraId = await  Categoria.findById(id);
  if (!encuentraId) {
    throw new Error(` este id: ${id} no correspone a ninguna categoria`)
  }

 }

 const existeProductoPorId = async (id) => {
  const encuentraId = await  Producto.findById(id);
  if (!encuentraId) {
    throw new Error(` este id: ${id} no correspone a ningun producto`)
  }

 }

   /**-----------------------------------------------------------------------------------------------------------------------
 *?                                                Validar colecciones permitidas
 *-----------------------------------------------------------------------------------------------------------------------**/

 const coleccionesPermitidas =  ( coleccion = '', colecciones = []) => {
      const incluida = colecciones.includes(coleccion);
      if (!incluida) {
        throw new Error(`La coleccion ${ coleccion } no es permitirda, ${ colecciones }`)
      }
      return true;
 }

  module.exports = {esRolValido, existeEmail, exiteUsuarioPorId,existeProductoPorId, existeCategoriaPorId, coleccionesPermitidas}