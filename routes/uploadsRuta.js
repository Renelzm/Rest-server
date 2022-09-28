const { Router } = require("express");
const { check } = require("express-validator");
const { v4: uuidv4 } = require('uuid');

const {
    validarJWT,
    validarCampos,
    esAdminRole,
    tieneRole,
    validarArchivoSubir
  } = require("../middlewares");
  const {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
  } = require("../controllers/uploadsController");

  const {
    coleccionesPermitidas
  } = require("../helpers");

const router = Router();


/*  CONTROLLERS

MIDDLEWARE
Verificar id con un check(´id´).custom( existeCategoria) en db validators

/*======================================================= INICIO DE RUTAS CATEGORIAS =======================================================*/

/**-----------------------------------------------------------------------------------------------------------------------
 * *                                                 GET 
 *-----------------------------------------------------------------------------------------------------------------------**/


router.get('/', (req, res) => {
    res.json({ msg : uuidv4() })
} )

/**-----------------------------------------------------------------------------------------------------------------------
 * *                                                 GET one  
 *-----------------------------------------------------------------------------------------------------------------------**/


router.get('/:coleccion/:id', mostrarImagen)

/**-----------------------------------------------------------------------------------------------------------------------
 * *                                                 POST  
 *-----------------------------------------------------------------------------------------------------------------------**/
router.post('/',validarArchivoSubir, cargarArchivo )


/**-----------------------------------------------------------------------------------------------------------------------
 * *                                                 PUT  
 *-----------------------------------------------------------------------------------------------------------------------**/
router.put('/:coleccion/:id', [
  check('id', 'El id debe de ser de mongo').isMongoId(),
  check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','productos'])),
  validarArchivoSubir,
  validarCampos
],actualizarImagen )
     
/**-----------------------------------------------------------------------------------------------------------------------
 * *                                                 Delte  
 *-----------------------------------------------------------------------------------------------------------------------**/
router.delete('/:id', (req, res) => {
    res.json({ msg : "delete"})
} )


module.exports = router

// ? VaLidaciones con middleware

// router.put('/:id', [
//     validarJWT,
//     check("id", "No es in id válido").isMongoId(),
//     check('nombre', "El nombre es obligatorio").not().isEmpty(),
//     check("id").custom(existeCategoriaPorId),
//     validarCampos
// ], actualizarCategoria)