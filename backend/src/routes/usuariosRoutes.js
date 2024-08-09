const { Router } = require('express');
const { crearUsuario, ingresarPassword, todosUsuarios } = require('../handlers/usuarioHandler');
const passport = require('passport');

const usuariosRoutes = Router();

usuariosRoutes.post('/post-usuario',passport.authenticate('jwt',{session:false}), crearUsuario);
usuariosRoutes.post('/post-usuario-crear-password', ingresarPassword);
usuariosRoutes.get('/gets-usuarios', todosUsuarios);


module.exports = usuariosRoutes;
