const { Router } = require('express');
const { crearUsuario } = require('../handlers/usuarioHandler');

const usuariosRoutes = Router();

usuariosRoutes.post('/post-usuario', crearUsuario);
// usuariosRoutes.get('/gets-usuario', obtenerEmpresas);


module.exports = usuariosRoutes;
