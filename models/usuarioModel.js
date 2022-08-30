const mongoose = require('mongoose');


const UsuarioModelo = mongoose.Schema({
    nombre: {
        type:String,
        required: [true, 'El nombre es requerido']
    },
    correo: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    img : {
        type: String,
    },
    rol: {
        type: String,
        required: [true],
        enum: ['ADMINISTRADOR_ROL', 'USUARIO_ROL']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },

});

//* PUT OUT PASSWORD FOR RESPONSE

UsuarioModelo.methods.toJSON = function () {
    const {__v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario
}
// El nombre de importación es el primero
module.exports =  mongoose.model('Usuario', UsuarioModelo);