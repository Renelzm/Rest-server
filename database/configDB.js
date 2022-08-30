const mongoose = require('mongoose')


/**================================================================================================
 *?                                       Conexión a base de Datos
 *  MONGODB_CNN es el URI del enviorement
 *================================================================================================**/
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