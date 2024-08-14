const { Router } = require('express');
const { crearRol, obtenerRoles, asignarPermisoRol, obtenerPermisos } = require('../handlers/rolHandler');

const rolesRoutes = Router();

rolesRoutes.get('/get-roles', obtenerRoles);
rolesRoutes.get('/get-permisos', obtenerPermisos);
rolesRoutes.post('/post-rol', crearRol);
rolesRoutes.post('/asignar-permiso', asignarPermisoRol);

module.exports = rolesRoutes;
