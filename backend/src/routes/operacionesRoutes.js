const { Router } = require('express');
const {
  realizarOperacionHandler,
  getTablaReportesDiariosHandler,
  getTablaVisualCargasHandler,
  postTablaDescargaHalndler,
  getTablaDescargaHandler,
  postTablaVentasHandlres,
  getTablaVentas,
} = require('../handlers/operacionesHandlers');

const operacionesRoutes = Router();

operacionesRoutes.post('/crearOperacion', realizarOperacionHandler);
operacionesRoutes.get('/getTablaReportesDiarios', getTablaReportesDiariosHandler);
operacionesRoutes.get('/getTablaVisualCarga', getTablaVisualCargasHandler);
operacionesRoutes.post('/crearTablaDescarga', postTablaDescargaHalndler);
operacionesRoutes.get('/getTablaDescarga', getTablaDescargaHandler);
operacionesRoutes.post('/postTablaVentas', postTablaVentasHandlres);
operacionesRoutes.get('/getTablaVentas', getTablaVentas);

module.exports = operacionesRoutes;
