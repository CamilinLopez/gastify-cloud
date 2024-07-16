const { check } = require('express-validator');

const validateCantidad = [
  check('cantidad', 'Cantidad es requerida').not().isEmpty(),
  check('cantidad', 'Cantidad debe ser un número').isNumeric(),
  check('cantidad', 'Cantidad debe ser un número entero positivo').isInt({
    gt: 0,
  }),
];

const validateTipoCilindro = [
  check('tipoCilindroId', 'tipoCilindroId es requerido').not().isEmpty(),
  check('tipoCilindroId', 'tipoCilindroId debe ser un número').isNumeric(),
  check('tipoCilindroId', 'tipoCilindroId debe ser un número entero positivo').isInt({
    gt: 0,
  }),
];

const validateEstadoCilindro = [
  check('estadoCilindroId', 'estadoCilindroId es requerido').not().isEmpty(),
  check('estadoCilindroId', 'estadoCilindroId debe ser un número').isNumeric(),
  check('estadoCilindroId', 'estadoCilindroId debe ser un número entero positivo').isInt({
    gt: 0,
  }),
];

module.exports = {
  validateCantidad,
  validateTipoCilindro,
  validateEstadoCilindro,
};
