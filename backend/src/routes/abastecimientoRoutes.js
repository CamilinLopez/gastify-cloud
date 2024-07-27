const { Router } = require('express');
const {
  inicializarDatos,
  crearAbastecimiento,
  getAbastacemiento,
  getTablaStockAbastecimiento,
} = require('../handlers/abastecimientoHandler');
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
abastecimientoRoutes.get('/getTablaStock', getTablaStockAbastecimiento);

module.exports = abastecimientoRoutes;
