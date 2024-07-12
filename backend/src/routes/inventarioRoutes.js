const { Router } = require("express");
const {
  inicializarDatos,
  crearInventario,
} = require("../handlers/inventarioHandler");

const inventarioRoutes = Router();

inventarioRoutes.post("/inicializarDatos", inicializarDatos);
inventarioRoutes.post("/crearInventario", crearInventario);

module.exports = inventarioRoutes;
