const { Router } = require('express');
const {
  realizarOperacionHandler,
  getTablaReportesDiariosHandler,
  getTablaVisualCargasHandler,
} = require('../handlers/operacionesHandlers');

const operacionesRoutes = Router();

operacionesRoutes.post('/crearOperacion', realizarOperacionHandler);
operacionesRoutes.get('/getTablaReportesDiarios', getTablaReportesDiariosHandler);
operacionesRoutes.get('/getTablaVisualCarga', getTablaVisualCargasHandler);

module.exports = operacionesRoutes;
