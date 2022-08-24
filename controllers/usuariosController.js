const { response } = require("express");

const usuariosGet = (req, res = response) => {

const {q,apikey, page=1} = req.query;

  res.json({
    Saludo: "Hola",
    msg: "Desde Get API - controlador",
    q,
    apikey,
    page
  });
};

const usuariosPost = (req, res = response) => {
  const body = req.body;
 
  res.json({
    Saludo: "Hola",
    msg: "Post API - controlador",
    body,
 
  });
};
const usuariosPut = (req, res = response) => {

const id = req.params.id;

  res.json({
    Saludo: "Hola",
    msg: "Put API - controlador",
    id
  });
};
const usuariosDelete = (req, res = response) => {
  res.json({
    Saludo: "Hola",
    msg: "Delete API - controlador",
  });
};

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
};
