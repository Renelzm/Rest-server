
const { v4: uuidv4 } = require('uuid');
const path = require("path");

const subirArchivo = ( files, extensionesValidas = ['jpg','jpeg','pdf'], carpeta = '') => {
   

    return new Promise((resolve, reject) => {
    
   const { archivo } = files
    
    // Usamos split para separar los campos por cada punto y leemos el dato poe medio del lenght
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1]

    // Validar extension

    if (!extensionesValidas.includes(extension)) {
       return reject(`La estensión ${extension} del archivo no es permitida, debe ser ${extensionesValidas}`);
    }

    
 
// ? Apartir de aqui se sube el archvivo

    const nombreTemporal = uuidv4() + '.' + extension;

    uploadPath = path.join(__dirname,'../uploads/', carpeta, nombreTemporal);

    archivo.mv(uploadPath, (err) => {
    if (err) {
        return reject(err);
    }

    resolve(nombreTemporal);
    });

    });

}



module.exports = {subirArchivo}