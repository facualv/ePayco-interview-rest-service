
// Aqui inicial la configuracion de nuestro entorno
if (process.env.NODE_ENV !== "production") {
   require("dotenv").config();
 }
 
 // Aqui ponemos todas las variables de configuracion en un solo punto para poder acceder a ellas
 // mas facilmente
 module.exports = {
   PORT: process.env.PORT,
   MONGO_URI: process.env.MONGO_URI,
   APPLICATION_NAME: process.env.APPLICATION_NAME,
   JWT_SECRET: process.env.JWT_SECRET,
   SWAGGER_PATH: `../config/swagger/${process.env.SWAGGER_DOC}.json`
 };