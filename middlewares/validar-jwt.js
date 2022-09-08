const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuarioModel')

/**------------------------------------------------------------------------------------------------
 *    ?                     Validación de JWT, si existe en bd y si esta activo
 * 
 * 1.- Funcion validando encabezado del header
 * 2.- Verificar su hay token 
 * 3.- Desestructurar el uid y verificar
 * 4.- Query de usuario para saber si exite en la base de datos y si su estado es true
 * 5.- Pasa y se crea variable con los datos del usuario
 *------------------------------------------------------------------------------------------------**/


const validarJWT = async (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        res.status(401).json({ 
            msg: "No hay token en la petición"
        });
    }

    try {
       const {uid} =  jwt.verify(token, process.env.SECRETO);

        const usuario = await Usuario.findById(uid);
        if (!usuario){
            msg: "Usuario no existe en base de datos"
        }

        if (!usuario.estado) {
            res.status(401).json({ 
                msg: "Token inválidos - estado false"
            })
        }

     // * METER usuario del token A req. para tenerlo disponoble

        req.usuario = usuario  

       next(); 
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no válido"
        })
    }
    
}


module.exports = {validarJWT}