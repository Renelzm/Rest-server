const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuarioModel')
7


const validarJWT = async (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        res.status(401).json({ 
            msg: "No hay token en la petición"
        });
    }

    try {
       const {uid} =  jwt.verify(token, process.env.SECRETO);
        
        // leer el usuario que corresponde a el uid
        // req.usuario = algo

        const usuario = await Usuario.findById(uid);
        if (!usuario){
            msg: "Usuario no existe en base de datos"
        }
        // Verificar si uid esta en true
        if (!usuario.estado) {
            res.status(401).json({ 
                msg: "Token inválidos - estado false"
            })
        }

        //Permite pasar esta req a el siguiente middleware con la información del usuario con su token
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