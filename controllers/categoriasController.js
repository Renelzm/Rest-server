const { response, request } = require("express");
const { Categoria } = require("../models")

// url/api/categorias

/**-----------------------------------------------------------------------------------------------------------------------
 **                                                 Post - Crear - Categoria
 *-----------------------------------------------------------------------------------------------------------------------**/

const crearCategoria = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB  = await Categoria.findOne({nombre});
    if (categoriaDB) {
       return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        });    

    }

    
    // Generar la data a guardar la categoria
    const data = { 
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );

    // Guardar en base de datos 
    await categoria.save();

    res.status(201).json(categoria)
};

/**-----------------------------------------------------------------------------------------------------------------------
 **                                                 Get - All - Categorías
 *-----------------------------------------------------------------------------------------------------------------------**/

const categoriasGet = async (req, res) => {
    const {limite = 5, desde = 0} = req.query
    const [totalDeCategorias, categorias] = await Promise.all([
    Categoria.countDocuments(),
    Categoria.find().populate('usuario', 'nombre').limit(limite).skip(desde)
    ]) 
    listaCategorias = []
    
    categorias.forEach(e => {
       nombre =   e.nombre
      
        listaCategorias.push(nombre)
    });
     
    res.json({totalDeCategorias, categorias, listaCategorias});


};

/**-----------------------------------------------------------------------------------------------------------------------
 **                                                 Get - ONE - Categorías
 *-----------------------------------------------------------------------------------------------------------------------**/


const categoriasGetOne = async (req, res) =>{
 const categoriaEncontrada = await Categoria.findById(req.params.id).populate('usuario', 'nombre')
res.json({categoriaEncontrada})
};

/**-----------------------------------------------------------------------------------------------------------------------
 **                                                 PUT - Categoría
 *-----------------------------------------------------------------------------------------------------------------------**/

const actualizarCategoria = async (req, res) => {
    const id = req.params.id
    const {estado, usuario, ...data} = req.body;
    data.usuario = req.usuario._id
    nombreNuevo = data.nombre.toUpperCase();
    const categoriaParaActualizar = await Categoria.findByIdAndUpdate(id, {nombre: nombreNuevo}).populate('usuario' , 'nombre' );
    res.json({
    msg: `La categoría ${categoriaParaActualizar.nombre} a cambiado por ${nombreNuevo} por el usuario: ${categoriaParaActualizar.usuario}`})
    
 }

 /**-----------------------------------------------------------------------------------------------------------------------
 **                                                 Delete - Categorías
 *-----------------------------------------------------------------------------------------------------------------------**/

 const desactivarCategoria = async (req, res) => {
    const id = req.params.id

    const categoriaParaDesactivar = await Categoria.findByIdAndUpdate(id, {estado: false});
    res.json({
    msg: `La categoría ${categoriaParaDesactivar.nombre} a cambiado a desactivada`})
    
 }



module.exports = {
    crearCategoria,
    categoriasGet,
    categoriasGetOne,
    actualizarCategoria,
    desactivarCategoria
}


