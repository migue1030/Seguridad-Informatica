const createApiKey = require('../services/apiKeyService');

const createApiKeyHandler = async (req, res) => {
  try {
    const apiKey = await createApiKey();
    res.status(201).json(apiKey);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createApiKey: createApiKeyHandler
};
