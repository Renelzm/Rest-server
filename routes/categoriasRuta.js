const { Router } = require("express");
const { check } = require("express-validator");
const {
    validarJWT,
    validarCampos,
    esAdminRole,
    tieneRole,
  } = require("../middlewares");
  const {
    crearCategoria,
    categoriasGet,
    categoriasGetOne,
    actualizarCategoria,
    desactivarCategoria
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
 * *                                                 GET all- Ruta-Validación-obtenerTodasCategorías
 *-----------------------------------------------------------------------------------------------------------------------**/


router.get('/', categoriasGet )

/**-----------------------------------------------------------------------------------------------------------------------
 * *                                                 GET one  - Ruta-Validación-unaCategoría ONE
 *-----------------------------------------------------------------------------------------------------------------------**/


router.get('/:id',[
    check("id", "No es in id válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos
], categoriasGetOne)

/**-----------------------------------------------------------------------------------------------------------------------
 * *                                                 POST  - Ruta-Validación-crearategoría
 *-----------------------------------------------------------------------------------------------------------------------**/
router.post('/', [
    validarJWT,
    check('nombre').not().isEmpty(),
    validarCampos
], crearCategoria)


/**-----------------------------------------------------------------------------------------------------------------------
 * *                                                 PUT  - Ruta-Validación-actualizarCategoría
 *-----------------------------------------------------------------------------------------------------------------------**/
router.put('/:id', [
    validarJWT,
    check("id", "No es in id válido").isMongoId(),
    check('nombre', "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(existeCategoriaPorId),
    validarCampos
], actualizarCategoria)
     
/**-----------------------------------------------------------------------------------------------------------------------
 * *                                                 Delte  - Ruta-Validación-BorrarCategoría
 *-----------------------------------------------------------------------------------------------------------------------**/
router.delete('/:id', [
    validarJWT,
    check("id", "No es in id válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    esAdminRole,
    validarCampos
] , desactivarCategoria)
module.exports = router