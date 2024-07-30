const { Router } = require('express');
const { crearEmpresa, obtenerEmpresas
 } = require('../handlers/empresaHandler');

const empresaRoutes = Router();

empresaRoutes.post('/post-empresa', crearEmpresa);
empresaRoutes.get('/gets-empresa', obtenerEmpresas);


module.exports = empresaRoutes;
