const { Router } = require('express');
const { alarmasCilindrosHandlers, crearAlarmasCilindrosHandler, leerAlarmasHandlers } = require('../handlers/alarmasHandlers');

const alarmasRouters = Router();

alarmasRouters.get('/getAlarmaCilindros', alarmasCilindrosHandlers);
alarmasRouters.post('/crearAlarmasCilindros', crearAlarmasCilindrosHandler);
alarmasRouters.get('/leerAlarmas', leerAlarmasHandlers);

module.exports = alarmasRouters;
