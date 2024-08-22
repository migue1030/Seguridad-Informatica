// src/utils/generateApiKey.js

/**
 * Genera una clave API aleatoria.
 * @returns {string} La clave API generada.
 */
const generateApiKey = () => {
  return require('crypto').randomBytes(32).toString('hex');
};

module.exports = generateApiKey; // Exportar la función
