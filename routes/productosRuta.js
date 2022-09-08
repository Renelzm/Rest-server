const { Router } = require("express");
const { check } = require("express-validator");
const {
    validarJWT,
    validarCampos,
    esAdminRole,
    tieneRole,
  } = require("../middlewares");
  const {
    crearPoducto,
    getProducto,
    getOneProducto,
    ActualizarProducto,
    desactivarProducto
  } = require("../controllers/productosController");

  const {
    existeProductoPorId
  } = require("../helpers/db-validators");

const router = Router();

/*======================================================= INICIO DE RUTAS CATEGORIAS =======================================================*/

/**-----------------------------------------------------------------------------------------------------------------------
 * *                                                 GET all- Ruta-Validación-obtenerTodos los Productos
 *-----------------------------------------------------------------------------------------------------------------------**/


 router.get('/', getProducto )

 /**-----------------------------------------------------------------------------------------------------------------------
  * *                                                 GET one  - Ruta-Validación-un Producto ONE
  *-----------------------------------------------------------------------------------------------------------------------**/
 
 
 router.get('/:id',[
     check("id", "No es in id válido").isMongoId(),
     check("id").custom(existeProductoPorId),
     validarCampos
 ], getOneProducto)
 
 /**-----------------------------------------------------------------------------------------------------------------------
  * *                                                 POST  - Ruta-Validación-crearPoducto
  *-----------------------------------------------------------------------------------------------------------------------**/
 router.post('/', [
     validarJWT,
     check('nombre').not().isEmpty(),
     validarCampos
 ], crearPoducto)
 
 
 /**-----------------------------------------------------------------------------------------------------------------------
  * *                                                 PUT  - Ruta-Validación-actualizarProducto
  *-----------------------------------------------------------------------------------------------------------------------**/
 router.put('/:id', [
     validarJWT,
     check("id", "No es in id válido").isMongoId(),
     check("id").custom(existeProductoPorId),
     validarCampos
 ], ActualizarProducto)
      
 /**-----------------------------------------------------------------------------------------------------------------------
  * *                                                 Delte  - Ruta-Validación-BorrarProducto
  *-----------------------------------------------------------------------------------------------------------------------**/
 router.delete('/:id', [
     validarJWT,
     check("id", "No es in id válido").isMongoId(),
     check("id").custom(existeProductoPorId),
     esAdminRole,
     validarCampos
 ] , desactivarProducto )


module.exports = router;