const { Router } = require('express');
const { alarmasCilindrosHandlers, crearAlarmasCilindrosHandler } = require('../handlers/alarmasHandlers');

const alarmasRouters = Router();

alarmasRouters.get('/getAlarmaCilindros', alarmasCilindrosHandlers);
alarmasRouters.post('/crearAlarmasCilindros', crearAlarmasCilindrosHandler);

module.exports = alarmasRouters;
