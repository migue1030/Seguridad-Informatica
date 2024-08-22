const cron = require('node-cron');
const { createApiKey } = require('../services/apiKeyService');

/**
 * Tarea programada para renovar claves API cada 24 horas.
 */
cron.schedule('0 0 * * *', async () => { // Ejecuta todos los días a medianoche
  try {
    await createApiKey(); // Genera una nueva clave API
    console.log('Nueva clave API creada y guardada.');
  } catch (error) {
    console.error('Error al renovar la clave API:', error);
  }
});
