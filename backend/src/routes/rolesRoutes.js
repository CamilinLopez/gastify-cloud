const { Router } = require('express');
const { crearRol, obtenerRoles, asignarPermisoRol } = require('../handlers/rolHandler');

const rolesRoutes = Router();

rolesRoutes.get('/get-roles', obtenerRoles);
rolesRoutes.post('/post-rol', crearRol);
rolesRoutes.post('/asignar-permiso', asignarPermisoRol);

module.exports = rolesRoutes;
