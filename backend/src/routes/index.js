const { Router } = require('express');
const pruebaRouters = require('./pruebaRouter');
const abastecimientoRoutes = require('./abastecimientoRoutes');
const inventarioRoutes = require('./inventarioRoutes');
const operacionesRoutes = require('./operacionesRoutes');
const reportesRoutes = require('./reportes');
const inicioRoutes = require('./inicio');
const rolesRoutes = require('./rolesRoutes');
const empresaRoutes = require('./empresaRoutes');
const usuariosRoutes = require('./usuariosRoutes');
const alarmasRouters = require('./alarmasRouters');

const routes = Router();



routes.use('/prueba', pruebaRouters);

//rutas para la seccion abastecimiento
routes.use('/abastecimiento', abastecimientoRoutes);
//rutas para la seccion inventario
routes.use('/inventario', inventarioRoutes);
//rutas para la seccion operaciones
routes.use('/operaciones', operacionesRoutes);
//rutas para la seccion de reportes
routes.use('/reportes', reportesRoutes);
//rutas para la seccion de reportes
routes.use('/inicio', inicioRoutes);

//rutas para la seccion roles
routes.use('/roles', rolesRoutes);
//rutas para la seccion empresa
routes.use('/empresa', empresaRoutes);
//rutas para la seccion usuarios
routes.use('/usuario', usuariosRoutes);

//rutas para seccion alarmas
routes.use('/alarmas', alarmasRouters);

module.exports = routes;
