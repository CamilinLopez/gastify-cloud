const { Router } = require('express');
const { ingresarPassword, todosUsuarios, todosUsuariosFiltrado } = require('../handlers/usuarioHandler');
const passport = require('passport');

const usuariosRoutes = Router();

// ruta para crear contraseña para los usuarios invitados
usuariosRoutes.post('/post-usuario-crear-password', passport.authenticate('jwt',{session:false}), ingresarPassword);

// ruta para obtener usuarios de las empresas
usuariosRoutes.get('/gets-usuarios', passport.authenticate('jwt',{session:false}), todosUsuarios);

// ruta para filtrar los usuarios filtrados por id email o rol
usuariosRoutes.post('/gets-usuarios-filtrado', passport.authenticate('jwt',{session:false}), todosUsuariosFiltrado);




module.exports = usuariosRoutes;
