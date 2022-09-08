const { Router } = require("express");
// const { check } = require("express-validator");
// const {
//     validarJWT,
//     validarCampos,
//     esAdminRole,
//     tieneRole,
//   } = require("../middlewares");
  const {
    buscar
  } = require("../controllers/buscar");

//   const {
//     existeCategoriaPorId
//   } = require("../helpers/db-validators");

const router = Router();


/*  CONTROLLERS


/*======================================================= INICIO DE RUTAS CATEGORIAS =======================================================*/

/**-----------------------------------------------------------------------------------------------------------------------
 * *                                                 GET  
 *-----------------------------------------------------------------------------------------------------------------------**/


router.get('/:collection/:termino', buscar )


module.exports = router
