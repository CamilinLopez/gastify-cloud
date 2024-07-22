const { Router } = require('express');
const { inicializarDatos, crearAbastecimiento, getAbastacemiento } = require('../handlers/inventarioHandler');
const { validateAbastecimiento } = require('../middleware/inventario');
const { handleValidationErrors } = require('../middleware/manejadorErrores');

const abastecimientoRoutes = Router();

abastecimientoRoutes.post('/inicializarDatos', inicializarDatos);
abastecimientoRoutes.post(
  '/crearAbastecimiento',
  [...validateAbastecimiento, handleValidationErrors],
  crearAbastecimiento,
);
abastecimientoRoutes.get('/getAbastecimiento', getAbastacemiento);

module.exports = abastecimientoRoutes;
