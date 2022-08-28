const mongoose = require('mongoose')

const dbConnection = async() => {
    try {
        console.log('iniciando conexión')
        await mongoose.connect(process.env.MONGODB_CNN);

    console.log('Base de datos online')
        
    } catch (error) {
        throw new Error('Error al inicializar la base de datos')
    }

}


module.exports = {
    dbConnection
}