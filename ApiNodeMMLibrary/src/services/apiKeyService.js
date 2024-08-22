// src/services/apiKeyService.js
const pool = require('../config/dbConfig');
const generateApiKey = require('../utils/generateApiKey'); // Importar función para generar la clave

/**
 * Crea una nueva clave API y la guarda en la base de datos.
 * @returns {Promise<Object>} El objeto con la clave API generada y su fecha de expiración.
 */
const createApiKey = async () => {
  const secretKey = generateApiKey();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 1); // La clave API expira en 24 horas

  try {
    await pool.query(
      'INSERT INTO api_keys (secret_key, expires_at) VALUES (?, ?)',
      [secretKey, expiresAt]
    );
    return { secretKey, expiresAt }; // Solo devolver secretKey y expiresAt
  } catch (error) {
    throw new Error('Error al crear la clave API: ' + error.message);
  }
};

module.exports = { createApiKey };
