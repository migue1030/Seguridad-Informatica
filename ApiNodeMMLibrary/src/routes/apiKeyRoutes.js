// src/routes/apiKeyRoutes.js
const express = require('express');
const router = express.Router();
const { createApiKey } = require('../services/apiKeyService'); // Asegúrate de que esta importación sea correcta

router.post('/generate', async (req, res) => {
  try {
    const apiKeyData = await createApiKey();
    res.status(201).json(apiKeyData);
  } catch (error) {
    console.error('Error al generar la clave API:', error);
    res.status(500).json({ error: 'Error al generar la clave API' });
  }
});

module.exports = router;
