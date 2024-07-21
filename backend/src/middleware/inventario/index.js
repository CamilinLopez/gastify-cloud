const { body } = require('express-validator');

// Define las reglas de validación
const validateAbastecimiento = [
  body('id').notEmpty().withMessage('El ID no puede estar vacío'),
  body('fecha').isISO8601().withMessage('La fecha debe ser una fecha válida en formato ISO8601'),
  body('hora')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
    .withMessage('La hora debe estar en formato HH:mm:ss'),
  body('cantidad').isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero mayor a 0'),
  body('tipoCilindroId.id').notEmpty().withMessage('El ID del tipo de cilindro no puede estar vacío'),
  body('tipoCilindroId.tipo').notEmpty().withMessage('El tipo de cilindro no puede estar vacío'),
  body('estadoCilindroId.id').notEmpty().withMessage('El ID del estado del cilindro no puede estar vacío'),
  body('estadoCilindroId.tipo').notEmpty().withMessage('El tipo del estado del cilindro no puede estar vacío'),
  body('modificar.id').notEmpty().withMessage('El ID del estado de modificar no puede estar vacío'),
  body('modificar.tipo').notEmpty().withMessage('El tipo del estado de modificar no puede estar vacío'),
];

module.exports = {
  validateAbastecimiento,
};
