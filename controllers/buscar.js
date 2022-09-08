const { response, request } = require("express");
const coleccionesPermitidas = ["usuarios", "categoria", "productos", "roles"];
const {ObjectId} = require("mongoose").Types
const {Usuario, Categoria, Producto} = require('../models/')


/**-----------------------------------------------------------------------------------------------------------------------
 *?                                      Función para buscar usuarios por nombre y correo 
 Steps: /1-Revisas si es una id de mongo, si es asi lo buscas por id / 2.- regex para busqueda dinámica
 *-----------------------------------------------------------------------------------------------------------------------**/
const buscarUsuarios = async(termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);
    if (esMongoId) {
      
      const usuario = await Usuario.findById(termino);
      return res.json( {results: (usuario) ? [usuario] : []})
    }

    // Término de js para decir coincodencias con el término
    const regex = new RegExp(termino, 'i')

    // $or dice que puedes buscar uno u otro $and dice que debe de tener ese término
    const usuarios = await Usuario.find({ 
      $or: [{ nombre: regex }, {correo: regex }],
      $and: [{estado: true}]
     
    });
    res.json({
      results: usuarios
    })
};

/**-----------------------------------------------------------------------------------------------------------------------
 *?                                      Función para buscar categorías 
 *-----------------------------------------------------------------------------------------------------------------------**/
 const buscarCategorias = async(termino = '', res = response) => {
  const esMongoId = ObjectId.isValid(termino);
  if (esMongoId) {
    const categoria = await Categoria.findById(termino);
    return res.json( {results: (categoria) ? [categoria] : []})
  }

  const regex = new RegExp(termino, 'i')

  const categorias = await Categoria.find({  nombre: regex ,
    $and: [{estado: true}]
   
  });
  res.json({
    results: categorias
  })
};

/**-----------------------------------------------------------------------------------------------------------------------
 *?                                      Función para buscar productos 
 *-----------------------------------------------------------------------------------------------------------------------**/
 const buscarProductos = async(termino = '', res = response) => {
  const esMongoId = ObjectId.isValid(termino);
  if (esMongoId) {
    const producto = await Producto.findById(termino).populate('categoria','nombre');
    return res.json( {results: (producto) ? [producto] : []})
  }

  const regex = new RegExp(termino, 'i')

  const productos = await Producto.find({  
    $or: [{nombre: regex},  {descripcion: regex}],
    $and: [{estado: true}]
   
  }).populate('categoria','nombre');
  res.json({
    results: productos
  })
};
/**-----------------------------------------------------------------------------------------------------------------------
 **                                                 Get - All - 
 *-----------------------------------------------------------------------------------------------------------------------**/

const buscar = async (req, res) => {
  const { collection, termino } = req.params;
  if (!coleccionesPermitidas.includes(collection)) {
      return res
      .status(401)
      .json({ msg: `las coleccione permitidas son ${coleccionesPermitidas}` });
  }

  switch (collection) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "categoria":
      buscarCategorias(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);
      break;
    default:
        res.status(500).json({msg: 'La busqueda esta olvidada'})
      break;
  }
  // res.json({ collection, termino });
};

module.exports = {
  buscar,
};
