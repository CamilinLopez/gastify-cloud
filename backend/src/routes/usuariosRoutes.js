const { Router } = require('express');
const { ingresarPassword, todosUsuarios, todosUsuariosFiltrado, usuarioAutenticado, eliminarUsuario } = require('../handlers/usuarioHandler');
const passport = require('passport');

const usuariosRoutes = Router();

// ruta para crear contraseña para los usuarios invitados
usuariosRoutes.post('/post-usuario-crear-password', ingresarPassword);

// ruta para obtener usuarios de las empresas
usuariosRoutes.get('/gets-usuarios', passport.authenticate('jwt',{session:false}), todosUsuarios);

// ruta para filtrar los usuarios filtrados por id email o rol
usuariosRoutes.post('/gets-usuarios-filtrado', passport.authenticate('jwt',{session:false}), todosUsuariosFiltrado);

usuariosRoutes.get('/get-usuario-data', passport.authenticate('jwt',{session:false}), usuarioAutenticado);

usuariosRoutes.delete('/delete-usuario/:userId', passport.authenticate('jwt',{session:false}), eliminarUsuario);


module.exports = usuariosRoutes;
