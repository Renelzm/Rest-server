const { response } = require("express");
const Usuario = require("../models/usuarioModel");
const bcryptjs = require("bcryptjs");
const generarJWT = require("../helpers/generarJWT");

/**-----------------------------------------------------------------------------------------------------------------------
 **                                                 Login - Usuarios
 *-----------------------------------------------------------------------------------------------------------------------**/


const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {

    //  Verificar si el email existe
     const usuario = await Usuario.findOne({correo});
     if (!usuario) {
        return res.status(400).json({msg: " Usuario / Password no son correctos"})
     }

    // Verificar si el usuario existe
    
    if (!usuario.estado) {
       return res.status(400).json({msg: 'Usuario desactivado'})
    }
    //  Verificar la contraseña
        const validPassword =  bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({msg: "Usuario / Password no son correctos"})  }

    // JWT
    const token = await generarJWT(usuario.id);


    res.json({
        token,
        usuario,
      msg: "Logueado Correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  login,
};
