const express = require('express');
const helmetMiddleware = require('./src/config/helmetConfig');
const corsConfig = require('./src/config/corsConfig');
const sessionMiddleware = require('./src/config/sessionConfig');
const rateLimit = require('./src/config/rateLimitConfig');
const apiKeyMiddleware = require('./src/middlewares/apiKeyMiddleware');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const { swaggerSpec, swaggerUi: swaggerUiMiddleware } = require('./src/swaggerOptions.js');

// Cargar variables de entorno
dotenv.config();

// Crear aplicación Express
const app = express();

// Configuración de middleware
app.use(helmetMiddleware); // Protección HTTP
app.use(corsConfig); // Configuración CORS
app.use(express.json()); // Parsear JSON

// Configurar limitación de tasa
app.use(rateLimit); // Aplica el limitador de tasa

// Configurar sesiones
app.use(sessionMiddleware); // Aplica el middleware de sesiones

// Rutas para generar clave API (no usar el middleware de clave API aquí)
const apiKeysRoutes = require('./src/routes/apiKeyRoutes');
app.use('/api/api-key', apiKeysRoutes); // Ajustar la ruta a '/api/api-key'

// Aplicar middleware para verificar clave API a rutas protegidas
const libroRoutes = require('./src/routes/librosRoutes');
app.use('/api/libros', apiKeyMiddleware, libroRoutes);

// Configurar Swagger UI
app.use('/api-docs', swaggerUiMiddleware.serve, swaggerUiMiddleware.setup(swaggerSpec));

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Algo salió mal!');
});

// Establecer el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
