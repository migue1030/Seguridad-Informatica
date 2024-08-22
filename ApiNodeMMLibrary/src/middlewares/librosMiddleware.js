const { validationResult, check } = require('express-validator');

// Middleware para validar datos al crear o actualizar un libro
const validateLibro = [
  check('titulo').notEmpty().withMessage('El título es obligatorio'),
  check('autor').notEmpty().withMessage('El autor es obligatorio'),
  check('anio_publicacion')
    .isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('El año debe ser un número válido entre 1900 y el año actual'),
  check('isbn')
    .isLength({ min: 13, max: 13 }).withMessage('El ISBN debe tener exactamente 13 caracteres')
    .matches(/^[0-9]+$/).withMessage('El ISBN debe contener solo números'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateLibro,
};
