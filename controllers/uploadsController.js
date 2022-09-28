const { response, request } = require("express");
const path = require("path");
const {subirArchivo} = require("../helpers")
const fs = require("fs")
const {Usuario,Producto } = require("../models/")

/**-----------------------------------------------------------------------------------------------------------------------
 *?                                                INFO
 *? Esta plantilla es la base del Crud para creaciónes rápidas
 *-----------------------------------------------------------------------------------------------------------------------**/

// ? IMPORTAR MODELOS

const { models } = require("../models");




/**-----------------------------------------------------------------------------------------------------------------------
 **                                                Post - Cargar  - Archivo
 *-----------------------------------------------------------------------------------------------------------------------**/

 const cargarArchivo = async (req, res =response) => {
    
    // Si no existe archivo o su longitus es igual a 0 o no viene como archivo desde el back
  try {
    // Files con otras extensiones  await subirArchivo(req.files ['jpg','txt', etc]);
     const nombre = await subirArchivo(req.files, undefined, 'usuarios');

  res.json({
    nombre
  })
  } catch (error) {
    res.status(400).json({
        msg: error
    })
  }

 


//   console.log('req.files >>>', req.files); // eslint-disable-line


//   ? Este código sube los archivos a una carpeta local

    
    };

/**-----------------------------------------------------------------------------------------------------------------------
 **                                                 Get - All - ??
 *-----------------------------------------------------------------------------------------------------------------------**/

const mostrarImagen= async (req, res) => {

    const {id, coleccion} = req.params;

    let modelo;
    switch (coleccion) {
      case 'usuarios':
          modelo = await Usuario.findById(id)
          if (!modelo) {
            return res.status(400). json({msg: 'no existe este id'});
          }
      break;
      case 'productos':
        modelo = await Producto.findById(id)
        if (!modelo) {
          return res.status(400). json({msg: 'no existe este producto'});
        }
    break;
      default:
        return res.status(500).json({msg: 'Se me olvido validar esto'});
    }
      
    // ? Limpiar imágenes previas
    if ( modelo.img ) {
      //Borrar la imagen anterior del servidor
    
      const pathImagen = path.join( __dirname, '../uploads/', coleccion, modelo.img );
      
      if ( fs.existsSync( pathImagen ) ) {
         return res.sendFile( pathImagen)
      } 
  }
    const pathImagen = path.join( __dirname, '../assets/no-image.jpg');

    res.sendFile(pathImagen)
};


/**-----------------------------------------------------------------------------------------------------------------------
 **                                                 Get - One - ??
 *-----------------------------------------------------------------------------------------------------------------------**/

const getOne = async (req, res) => {
    res.json({ msg: 'get one'})
};

/**-----------------------------------------------------------------------------------------------------------------------
 **                                                 Put - One - ??
 * ? Aqui recibe los parametros de la ruta y los desestructura
 * ? Dependiendo de cual coleccion entre por swich hace un query a la tabla correspondiente
 * ? Preguntamos si el modelo.img de la query existe vamos segun la ruta y nombre del query preguntamos si el archivo existe y si es asi unlink para borrar
 * 
 *-----------------------------------------------------------------------------------------------------------------------**/

const actualizarImagen = async (req, res) => {


    const {coleccion, id} = req.params;
    let modelo;
    switch (coleccion) {
      case 'usuarios':
          modelo = await Usuario.findById(id)
          if (!modelo) {
            return res.status(400). json({msg: 'no existe este id'});
          }
      break;
      case 'productos':
        modelo = await Producto.findById(id)
        if (!modelo) {
          return res.status(400). json({msg: 'no existe este producto'});
        }
    break;
      default:
        return res.status(500).json({msg: 'Se me olvido validar esto'});
    }

    // ? Limpiar imágenes previas
    if ( modelo.img ) {
      //Borrar la imagen anterior del servidor
    
      const pathImagen = path.join( __dirname, '../uploads/', coleccion, modelo.img );
      if ( fs.existsSync( pathImagen ) ) {
          fs.unlinkSync( pathImagen );
      }
  }


     const nombre = await subirArchivo (req.files, undefined, coleccion);
      modelo.img = nombre;


      await modelo.save();
    res.json({modelo})
};

/**-----------------------------------------------------------------------------------------------------------------------
 **                                                 Delete - One - ??
 *-----------------------------------------------------------------------------------------------------------------------**/


const desactivar = async (req, res) => {
    res.json({ msg: ' Actualizar'})
};

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
};
