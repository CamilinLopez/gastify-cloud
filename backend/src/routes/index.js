const { Router } = require('express');
const pruebaRouters = require('./pruebaRouter');
const abastecimientoRoutes = require('./abastecimientoRoutes');
const inventarioRoutes = require('./inventarioRoutes');
const rolesRoutes = require('./rolesRoutes');
const empresaRoutes = require('./empresaRoutes');
const usuariosRoutes = require('./usuariosRoutes');

const routes = Router();

routes.use('/prueba', pruebaRouters);

//rutas para la seccion abastecimiento
routes.use('/abastecimiento', abastecimientoRoutes);
//rutas para la seccion inventario
routes.use('/inventario', inventarioRoutes);

//rutas para la seccion roles
routes.use('/roles', rolesRoutes);
//rutas para la seccion empresa
routes.use('/empresa', empresaRoutes);
//rutas para la seccion usuarios
routes.use('/usuario', usuariosRoutes);

module.exports = routes;
