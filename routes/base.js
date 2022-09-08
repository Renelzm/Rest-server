const { Router } = require("express");
const { check } = require("express-validator");
const {
    validarJWT,
    validarCampos,
    esAdminRole,
    tieneRole,
  } = require("../middlewares");
  const {
    controladores
  } = require("../controllers/categoriasController");

  const {
    existeCategoriaPorId
  } = require("../helpers/db-validators");

const router = Router();


/*  CONTROLLERS

MIDDLEWARE
Verificar id con un check(´id´).custom( existeCategoria) en db validators

/*======================================================= INICIO DE RUTAS CATEGORIAS =======================================================*/

/**-----------------------------------------------------------------------------------------------------------------------
 * *                                                 GET 
 *-----------------------------------------------------------------------------------------------------------------------**/


router.get('/', (req, res) => {
    res.json({ msg : "get"})
} )

/**-----------------------------------------------------------------------------------------------------------------------
 * *                                                 GET one  
 *-----------------------------------------------------------------------------------------------------------------------**/


router.get('/:id',(req, res) => {
    res.json({ msg : "  get all "})
} )

/**-----------------------------------------------------------------------------------------------------------------------
 * *                                                 POST  
 *-----------------------------------------------------------------------------------------------------------------------**/
router.post('/',(req, res) => {
    res.json({ msg : "post"})
} )


/**-----------------------------------------------------------------------------------------------------------------------
 * *                                                 PUT  
 *-----------------------------------------------------------------------------------------------------------------------**/
router.put('/:id',(req, res) => {
    res.json({ msg : "put"})
} )
     
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