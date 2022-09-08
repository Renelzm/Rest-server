
/**=======================================================================================================================
 **                                              MIDDLEWARE PARA VALIDAR ROLES DE USUARIO
 *=======================================================================================================================**/

const esAdminRole = (req, res, next) => {
    
    if (!req.usuario){
      return res.json(500).json({
        msg: 'Se quiere verificar el rol sin validar el token primero'
    });
    }
    const {rol, nombre} =  req.usuario;

    if ( rol !== 'ADMINISTRADOR_ROL' ) {
        return res.status(401).json({
            msg: "No tiene permisos de administrador"
        });
    }
    next();
}

// ...roles => Genera un arreglo juntando los argumentos que lleguen
const tieneRole = ( ...roles ) => {
    return (req, res, next) =>{

        if (!req.usuario){
            return res.json(500).json({
              msg: 'Se quiere verificar el rol sin validar el token primero'
          });
          }
          
          if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requieres uno de estos roles ${ roles }`
            });
          }
        next();
    }
    
}

module.exports = {
    esAdminRole,
    tieneRole
}