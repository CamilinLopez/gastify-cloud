const { Router } = require('express');
const { getTablaReportesDiariosHandler } = require('../handlers/reportes');

const reportesRoutes = Router();

reportesRoutes.get('/getTablaReportes', getTablaReportesDiariosHandler);

module.exports = reportesRoutes;
