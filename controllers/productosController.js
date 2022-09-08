const { response, request } = require("express");
const { Producto, Categoria } = require("../models");

/**-----------------------------------------------------------------------------------------------------------------------
 **                                                 Post - Crear - Producto
 *-----------------------------------------------------------------------------------------------------------------------**/

const crearPoducto = async (req, res = response) => {
  const { nombre, precio, categoria, descripcion } = req.body;

  // Querys para validar datos
  const buscarCategoria = await Categoria.findOne({ nombre: categoria });
  if (!buscarCategoria) {
    return res.status(400).json({ msg: "Error al encontrar la categoria" });
  }
  const existePoducto = await Producto.findOne({ nombre });
  if (existePoducto) {
    return res.status(400).json({ msg: "El producto ya existe" });
  }

  // Data del producto antes de guardar
  const data = {
    nombre,
    precio,
    categoria: buscarCategoria._id,
    descripcion,
    usuario: req.usuario._id,
  };

  const producto = new Producto(data);

  // GUARDADO

  await producto.save();
  res.status(201).json({ data });
};

/**-----------------------------------------------------------------------------------------------------------------------
 **                                                 Get - All - Productos
 *-----------------------------------------------------------------------------------------------------------------------**/

const getProducto = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;
  const [totalDeProductos, productos] = await Promise.all([
    Producto.countDocuments(),
    Producto.find()
      .populate("usuario", "nombre")
      .populate("categoria", "nombre")
      .limit(limite)
      .skip(desde),
  ]);

  res.json({ totalDeProductos, productos });
};

/**-----------------------------------------------------------------------------------------------------------------------
 **                                                 Get - One - Producto
 *-----------------------------------------------------------------------------------------------------------------------**/

const getOneProducto = async (req, res) => {
  const productoEncontrado = await Producto.findById(req.params.id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");
  res.json({ productoEncontrado });
};

/**-----------------------------------------------------------------------------------------------------------------------
 **                                                 Put - One - Producto
 *-----------------------------------------------------------------------------------------------------------------------**/

const ActualizarProducto = async (req, res) => {
  const id = req.params.id;
  const { nombre, precio, categoria, descripcion } = req.body;

  // Querys para validar datos
  const buscarCategoria = await Categoria.findOne({ nombre: categoria });
  if (!buscarCategoria) {
    return res.status(400).json({ msg: "Error al encontrar la categoria" });
  }

  // Data del producto antes de guardar
  const data = {
    nombre,
    precio,
    categoria: buscarCategoria._id,
    descripcion,
    usuario: req.usuario._id,
  };
  const productoParaActualizar = await Producto.findByIdAndUpdate(id, data);
  res.json({ productoParaActualizar });
};

/**-----------------------------------------------------------------------------------------------------------------------
 **                                                 Delete - One - Producto
 *-----------------------------------------------------------------------------------------------------------------------**/

const desactivarProducto = async (req, res) => {
  const id = req.params.id;
  const productoParaDesactivar = await Producto.findByIdAndUpdate(id, {
    estado: false,
  });
  res.json({
    msg: `El Producto ${productoParaDesactivar.nombre} a cambiado a desactivado`,
  });
};

module.exports = {
  crearPoducto,
  getProducto,
  getOneProducto,
  ActualizarProducto,
  desactivarProducto,
};
