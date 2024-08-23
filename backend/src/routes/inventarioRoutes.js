const { Router } = require('express');
const {
  getTablaInventarioBodegaHandler,
  crearConductorHandler,
  tomarTablaConductores,
  crearCamionesHandler,
  tomarTablaCamiones,
  eliminarConductorHandler,
  eliminarCamionHandler,
} = require('../handlers/inventarioHandler');

const inventarioRoutes = Router();

inventarioRoutes.get('/getTablaInventarioBodega', getTablaInventarioBodegaHandler);
inventarioRoutes.post('/crearConductor', crearConductorHandler);
inventarioRoutes.get('/getTablaConductores', tomarTablaConductores);
inventarioRoutes.post('/crearCamiones', crearCamionesHandler);
inventarioRoutes.get('/getTablaCamiones', tomarTablaCamiones);
inventarioRoutes.delete('/deleteCamiones/:id', eliminarCamionHandler);
inventarioRoutes.delete('/deleteConductores/:id', eliminarConductorHandler);

module.exports = inventarioRoutes;
