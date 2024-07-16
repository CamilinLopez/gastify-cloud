const { Router } = require('express');
const { inicializarDatos, crearInventario } = require('../handlers/inventarioHandler');
const { validateCantidad, validateTipoCilindro, validateEstadoCilindro } = require('../middleware/inventario');
const { handleValidationErrors } = require('../middleware/manejadorErrores');

const inventarioRoutes = Router();

inventarioRoutes.post('/inicializarDatos', inicializarDatos);
inventarioRoutes.post(
  '/crearInventario',
  [...validateCantidad, ...validateTipoCilindro, validateEstadoCilindro, handleValidationErrors],
  crearInventario,
);

module.exports = inventarioRoutes;
