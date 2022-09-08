# NOTAS

## StepsBase:

1. Instalar dependencias express, dotenv, cors (INSTALACIONES)
2. Crear carpeta de models => server.js (BASE)
3. Se crea la clase Server con un constructor que detona Server (BASE)
   * Primero la asignación de variables para las dependencias 
   * Despés los métodos o funciones que más abajo se escriben
4. Se escriben las funciones de listen para el puerto, middlewares y rutas. (BASE)
5. Crea la carpeta public con su html y determina esa página como this.app.use(express.static('public')); (SERVIDOR V1.0.0)
6. En las rutas ya se pueden configurar los endpoints 
7. Cambiamos las rutas a un archivo routes => usuarios, etc. NOTA: routes solo debe de tener las rutas y protección de estas (ROUTES)
8. Creamos los controllers => usuarios para crear funciones y exportarlas (CONTROLLER)
9.  Agremgamos midleware de express para que lea todo en json this.app.use(express.json()); (SERVER)
10. El req de post trar el body por lo que creamos una variable body = req.body o destructuramos const {nombre, edad} = req.body (CONTROLLER)
11. Ver pasos de BD (DB)
12. Validar datos antes de guardar en usuariosRuta (ROUTER)
13. Crear un middleware para respuesta de campos ver validar-campos (MIDDLEWARE/ROUTER)
14. Crear en BD catalogo de usuarios y crear un helper que encuentre si existe bd-validator => check('rol').custom(esRolValido), (HELPER) 
15. Quitar el password desde el modelo // UsuarioModelo.methods.toJSON = function () {  const {__v, password, ...usuario} = this.toObject();  return usuario} (MODELS)

## LOGIN
1. Instalar jsonwebtoken
2. Cambiar path y rutas authpat and routes(va a routes) (SERVER)
3. Crear el archivo de routes/authRuta => requerir router, check, controller para auth, validardatos(helper)=> Crear post login y revisar si es correo y si la contraseña tiene Datos (ROUTES)
4. Crear archivo de controlador de login => requerir bcrypt, modelo de usuario y jwt (CONTROLLER)
5. Se hace un query a la base de datos para ver si existe el correo, si esta activo el usuario y si el password hace match (CONTROLLER)
6. Se crea un helper para crear un jwt, con el secret en la variable de entorno (Helpers)
7. Establecer middlewares para validart el rol del usuario y validar jwt const tieneRole = ( ...roles ) para crear arreglo y  if (!roles.includes(req.usuario.rol) para ver si existe
8. 



### PROTEJER RUTA
1. Middleeare nuevo para validar jwt 
2. 

## Peticiones http

POST => body = req.body Recibir body
PARAMETROS URL => routes/ (ruta/:id),  => controller id = req.params.id
QueryParams => query = req.query;  EJQUERY = ?q=hola&apikey=1234
QueryParamsDestructuring => {q,apikey} = req.query

## Respuestas del servidor
res.json = Crea json({msg:"Good"})
res.status(401).json({msg:"Error"})


## Dependencias:

* dotenv / Configurar variables de entorno de entorno / require('dotenv').config();
* express / 
* cors / Para permitir accesos a los end point
* express-validator
* bcryptjs
* mongoose
* jsonwebtoken


## Base de datos mongoose

1. Mongo db cuenta free => uri en conect => conectar con mongo atlas 
2. Descargar mongogoose
3. Env poner los datos de conexión a DB y antes de los middlewaes en server generar conexión
4. Crear carpeta de database y archivo configDB (Se crea y se exporta)
5. La exportación se recoge en server.js => crea funcion async await para correr en el contructor (Conexion correcta)
6. Crea modelo de datos en carpeta models => tipo de colección (usuarios, etc)
7. exporta el modelo => en el controlador importa => se ejecuta
8. Se ejecuta la función de mongoose (new instancia) con el body req
9. Se encripta contraseña => variableContenedora de datos.password = const salt = bcryptjs.genSaltSync(); usuarioPost.password = bcryptjs.hashSync(password, salt);
10. Se guarda en bd   await usuarioPost.save();


## Heroku despliegues 

### Subir a heroku
1. Se crea el repo con el nombre
2. heroku git remote
3. git push heroku main
4. Scrits "start "node app"



### Variables de entorno
* heroku config: set variable="text" => Establecer variable
* heroku config: unset variable="text" => Quitar variable
* EX MONGODB_CNN=mongodb+srv://user_node_rlm:ujeeSUrHVJcqqXnc@clusterrlm.hrt3k4v.mongodb.net/DBstore
* ver logs : heroku logs -n 100


## Google SignIn
1. Consola de gcloud con un proyecto
2. Ir a pantalla de consentimiento de credenciales y llenar los datos del proyecto
3. En credenciales  permitimos las URI aotprizadas localhost y localhost:8080 y la página en la que etsa alojada
4. En automático crea un clientId  se copia y se crean dos variables de entorno GOOGLE_CLIENT_ID= RESULT Y G_SECRET_ID = RESULT
5. https://developers.google.com/identity/gsi/web/guides/display-button#html CÓDIGO
6. https://developers.google.com/identity/gsi/web/guides/handle-credential-responses-js-functions DATA ATRIBUTE CALLBACK COPIAR
7. PEGAR FUNVION DE scripts




### CRUD GUIDE
1. Crear ruta, controlador, y path en server
2. En las rutas creamos el crud (get/post/put..etx¿c) router.get('/',  (req, res) => { res.json('get');});
3. Crear modelo modelo
