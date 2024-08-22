const rateLimit = require('express-rate-limit');

const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 solicitudes por ventana de tiempo
  message: 'Demasiadas solicitudes desde esta IP, por favor intente nuevamente más tarde.',
});

module.exports = rateLimitMiddleware;
