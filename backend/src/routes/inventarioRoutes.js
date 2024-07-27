const { Router } = require('express');
const { getTablaInventarioBodegaHandler } = require('../handlers/inventarioHandler');

const inventarioRoutes = Router();

inventarioRoutes.get('/getTablaInventarioBodega', getTablaInventarioBodegaHandler);

module.exports = inventarioRoutes;
