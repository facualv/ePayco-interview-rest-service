// Aqui inicial la configuracion de nuestro entorno
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
}

// Aqui ponemos todas las variables de configuracion en un solo punto para poder acceder a ellas
// mas facilmente
module.exports = {
  PORT: process.env.PORT,
  APPLICATION_NAME: process.env.APPLICATION_NAME,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SESSION_LIFETIME: process.env.SESSION_LIFETIME,
  SESSION_NAME: process.env.SESSION_NAME,
  REQUEST_URL: process.env.REQUEST_URL,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_USER: process.env.EMAIL_USER
};
