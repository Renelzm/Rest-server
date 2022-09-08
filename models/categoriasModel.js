const { Schema, model} = require('mongoose')


const CategoriaSchema = Schema({
    nombre: { 
        type: String,
        required: [true, 'El rol es oblogatorio']
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
    


});

//* Quitar elementos que no necesito para las respuestas

CategoriaSchema.methods.toJSON = function () {
    const {__v, estado,  ...categoria} = this.toObject();
    return categoria
}

module.exports = model('Categoria', CategoriaSchema);