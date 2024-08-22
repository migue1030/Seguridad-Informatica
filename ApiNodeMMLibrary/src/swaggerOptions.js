const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Opciones de configuración para Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Libros',
      version: '1.0.0',
      description: 'API para gestionar libros en la biblioteca.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
    components: {
      securitySchemes: {
        apiKey: {
          type: 'apiKey',
          in: 'header',
          name: 'x-api-key',
        },
      },
    },
    security: [
      {
        apiKey: [],
      },
    ],
  },
  apis: ['./src/routes/librosRoutes.js'], // Ruta a archivos de rutas con comentarios de Swagger
};

// Generar especificaciones de Swagger
const swaggerSpec = swaggerJsDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
