// src/config/sessionConfig.js
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config(); // Cargar variables de entorno desde el archivo .env

const sessionConfig = session({
  secret: process.env.SESSION_SECRET || 'hola', // Usa una clave secreta segura
  resave: false, // No volver a guardar la sesión si no ha habido cambios
  saveUninitialized: true, // Guarda una sesión nueva si no ha sido modificada
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // Tiempo de vida de la cookie (1 día)
  }
});

module.exports = sessionConfig;
