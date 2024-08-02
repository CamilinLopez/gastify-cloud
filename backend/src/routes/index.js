const { Router } = require('express');
const pruebaRouters = require('./pruebaRouter');
const abastecimientoRoutes = require('./abastecimientoRoutes');
const inventarioRoutes = require('./inventarioRoutes');
const operacionesRoutes = require('./operacionesRoutes');

const routes = Router();

routes.use('/prueba', pruebaRouters);

//rutas para la seccion abastecimiento
routes.use('/abastecimiento', abastecimientoRoutes);
//rutas para la seccion inventario
routes.use('/inventario', inventarioRoutes);
//rutas para la seccion operaciones
routes.use('/operaciones', operacionesRoutes);
module.exports = routes;
