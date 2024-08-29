const { Router } = require('express');
const { crearRol, obtenerRoles, asignarPermisoRol, obtenerPermisos,rolesPermisosUsuario } = require('../handlers/rolHandler');
const passport = require('passport');

const rolesRoutes = Router();

rolesRoutes.get('/get-roles', passport.authenticate('jwt',{session:false}),  obtenerRoles);
rolesRoutes.get('/get-permisos',  passport.authenticate('jwt',{session:false}), obtenerPermisos);
rolesRoutes.post('/post-rol', crearRol);
rolesRoutes.get('/roles-permisos',  passport.authenticate('jwt',{session:false}),rolesPermisosUsuario );



rolesRoutes.put('/asignar-permiso/:rolId', passport.authenticate('jwt',{session:false}),  asignarPermisoRol);

module.exports = rolesRoutes;
