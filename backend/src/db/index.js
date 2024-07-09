const { Sequelize } = require("sequelize");
const {
  modelEstadocilindro,
  modelInventarioBodega,
  modelTipoCilindro,
} = require("./models/inventario/index");

const database = new Sequelize(
  "postgres://postgres:camilo1998@localhost:5432/gastifycloud",
  {
    logging: false,
    native: false,
  }
);

modelEstadocilindro(database);
modelInventarioBodega(database);
modelTipoCilindro(database);

module.exports = {
  ...database.models,
  database,
};
