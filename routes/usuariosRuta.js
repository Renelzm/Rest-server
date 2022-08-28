const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  esRolValido,
  existeEmail,
  exiteUsuarioPorId,
} = require("../helpers/db-validators");
const {
  usuariosGet,
  usuarioGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuariosController");
const router = Router();

/*======================================================= INICIO DE RUTAS USUARIO =======================================================*/


/**-----------------------------------------------------------------------------------------------------------------------
 * *                                                 GET - POST - Ruta-Validación-Usuarios
 *-----------------------------------------------------------------------------------------------------------------------**/

router.get("/", usuariosGet);

router.get("/:id", usuarioGet);


/**----------------------------------------------------------------------------------------------------------------------
 **                                                 POST - Ruta-Validación-Usuarios
 *-----------------------------------------------------------------------------------------------------------------------**/
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "El correo no es válido").isEmail().custom(existeEmail),
    check(
      "password",
      "El password debe de contener al menos 6 carácteres"
    ).isLength({ min: 6 }),
    // check('rol','No es un rol válido').isIn(['ADMINISTRADOR_ROL', 'USUARIO_ROL']),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPost
);

/**-----------------------------------------------------------------------------------------------------------------------
 **                                                 PUT - Ruta-Validación-Usuarios
 *-----------------------------------------------------------------------------------------------------------------------**/
router.put(
  "/:id",
  [
    check("id", "No es in id válido").isMongoId(),
    check("id").custom(exiteUsuarioPorId),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPut
);

/**-----------------------------------------------------------------------------------------------------------------------
 **                                                 DELETE - Ruta-Validación-Usuarios
 *-----------------------------------------------------------------------------------------------------------------------**/
router.delete("/:id",[
  check("id", "No es in id válido").isMongoId(),
  check("id").custom(exiteUsuarioPorId),
  validarCampos
], usuariosDelete);

/**-----------------------------------------------------------------------------------------------------------------------
 **                                                 PATCH - Ruta-Validación-Usuarios
 *-----------------------------------------------------------------------------------------------------------------------**/
router.patch("/", usuariosPatch);

module.exports = router;
