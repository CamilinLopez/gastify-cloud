const { Router } = require('express');
const { crearPermisos, obtenerPermisos } = require('../handlers/permisoHandler');

const permisosRoutes = Router();

permisosRoutes.get('/get-permisos', obtenerPermisos);
permisosRoutes.post('/post-permisos', crearPermisos);

module.exports = permisosRoutes;
