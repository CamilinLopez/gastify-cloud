const { Router } = require("express");
const pruebaRouters = require("./pruebaRouter");
const abastecimientoRoutes = require("./abastecimientoRoutes");

const routes = Router();

routes.use("/prueba", pruebaRouters);

//rutas para la seccion abastecimiento
routes.use("/abastecimiento", abastecimientoRoutes);

module.exports = routes;
