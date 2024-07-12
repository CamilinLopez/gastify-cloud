const { Router } = require("express");
const pruebaRouters = require("./pruebaRouter");
const inventarioRoutes = require("./inventarioRoutes");

const routes = Router();

routes.use("/prueba", pruebaRouters);

//rutas para la seccion inventario
routes.use("/inventario", inventarioRoutes);

module.exports = routes;
