const { Router } = require('express');
const { inicializarDatos, crearInventario } = require('../handlers/inventarioHandler');
const { validateAbastecimiento } = require('../middleware/inventario');
const { handleValidationErrors } = require('../middleware/manejadorErrores');

const inventarioRoutes = Router();

inventarioRoutes.post('/inicializarDatos', inicializarDatos);
inventarioRoutes.post('/crearInventario', [...validateAbastecimiento, handleValidationErrors], crearInventario);

module.exports = inventarioRoutes;
