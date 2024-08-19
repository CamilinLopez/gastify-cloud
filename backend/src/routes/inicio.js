const { Router } = require('express');
const { getTablaReportesDiariosHandler, getCantidadVendidaPorDiaHandler, getVentaPorMesHandler } = require('../handlers/inicio');

const inicioRoutes = Router();

inicioRoutes.get('/getTablaResumenInventario', getTablaReportesDiariosHandler);
inicioRoutes.get('/getReportePorDia', getCantidadVendidaPorDiaHandler);
inicioRoutes.get('/getReportePorMes', getVentaPorMesHandler);

module.exports = inicioRoutes;
