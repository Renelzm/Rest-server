

/**-----------------------------------------------------------------------------------------------------------------------
 * ?                           Index para juntar las importaciones de los middlewares
 *-----------------------------------------------------------------------------------------------------------------------**/

const validarJWT  = require("../middlewares/validar-jwt");
const validarCampos = require("../middlewares/validar-campos");
const validarRoles = require("../middlewares/validar-roles");
const validarArchivoSubir = require("../middlewares/validar-archivo");

module.exports = {
    ...validarJWT,
    ...validarCampos,
    ...validarRoles,
    ...validarArchivoSubir
    
}