const pool = require('../config/dbConfig'); // Configuración de la base de datos

/**
 * Middleware para autenticar la clave API.
 */
const apiKeyMiddleware = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({ error: 'Clave API no proporcionada' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM api_keys WHERE secret_key = ? AND expires_at > NOW()', [apiKey]);
    if (rows.length === 0) {
      return res.status(403).json({ error: 'Clave API inválida o expirada' });
    }
    next();
  } catch (error) {
    console.error('Error en la verificación de la clave API:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = apiKeyMiddleware;
