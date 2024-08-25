const { Router } = require('express');
const { crearRol, obtenerRoles, asignarPermisoRol, obtenerPermisos } = require('../handlers/rolHandler');
const passport = require('passport');

const rolesRoutes = Router();

rolesRoutes.get('/get-roles', passport.authenticate('jwt',{session:false}),  obtenerRoles);
rolesRoutes.get('/get-permisos',  passport.authenticate('jwt',{session:false}), obtenerPermisos);
rolesRoutes.post('/post-rol', crearRol);


rolesRoutes.put('/asignar-permiso/:rolId', passport.authenticate('jwt',{session:false}),  asignarPermisoRol);

module.exports = rolesRoutes;
