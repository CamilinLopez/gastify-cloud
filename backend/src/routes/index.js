const { Router } = require("express");
const pruebaRouters = require("./pruebaRouter");

const routes = Router();

routes.use("/prueba", pruebaRouters);

module.exports = routes;
