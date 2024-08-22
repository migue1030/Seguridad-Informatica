const cors = require('cors');

// Configuración de CORS
const corsOptions = {
  origin: ['http://localhost:3000'], // Permite múltiples orígenes
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Permitir cookies
};

// Middleware CORS
const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;