const { Schema, model} = require('mongoose')


const ProductoSchema = Schema({
    nombre: { 
        type: String,
        required: [true, 'El nombre del producto es es oblogatorio']
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
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: { type: String},
    disponible: {type: Boolean, default: true}
    


});

//* Quitar elementos que no necesito para las respuestas

ProductoSchema.methods.toJSON = function () {
    const {__v, estado,  ...producto} = this.toObject();
    return producto
}

module.exports = model('Producto', ProductoSchema);