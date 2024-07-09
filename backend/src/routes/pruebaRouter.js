const { Router } = require("express");
const { pruebaHandler } = require("../handlers/pruebaHandler");

const pruebaRouters = Router();

pruebaRouters.get("/", pruebaHandler);

module.exports = pruebaRouters;
