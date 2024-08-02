const { Router } = require('express');
const { realizarOperacionHandler } = require('../handlers/operacionesHandlers');

const operacionesRoutes = Router();

operacionesRoutes.post('/crearOperacion', realizarOperacionHandler);

module.exports = operacionesRoutes;
