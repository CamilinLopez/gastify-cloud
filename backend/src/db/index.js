const { Sequelize } = require("sequelize");
const { modelPrueba } = require("./models");

const database = new Sequelize(
  "postgres://postgres:camilo1998@localhost:5432/gastifycloud",
  {
    logging: false,
    native: false,
  }
);

modelPrueba(database);

module.exports = {
  ...database.models,
  database,
};
