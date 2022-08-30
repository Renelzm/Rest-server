  
  const jwt = require('jsonwebtoken');
  
  /**-----------------------------------------------------------------------------------------------------------------------
 *?                                                 Generar JsonWebToken 
 *-----------------------------------------------------------------------------------------------------------------------**/
 const generarJWT =  (uid = '') => {
    return new Promise((resolve, reject) => {
            const payload = { uid };
            jwt.sign(payload, process.env.SECRETO,{
                expiresIn: '4h'
            }, (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se pudo generar el jwt')
                } else {
                    resolve(token);
                }
            }
            )
    })

 }


 module.exports = generarJWT