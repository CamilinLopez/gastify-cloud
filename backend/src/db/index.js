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

//llamar modelos 
modelEstadocilindro(database);
modelInventarioBodega(database);
modelTipoCilindro(database);

//modelos de seccion inventario
const { estado_cilindros, inventario_bodega, tipo_cilindros } = database.models; 

//relaciones seccion inventario
inventario_bodega.belongsTo(tipo_cilindros, { foreignKey: "tipoCilindroId" });
inventario_bodega.belongsTo(estado_cilindros, {
  foreignKey: "estadoCilindroId",
});

module.exports = {
  ...database.models,
  database,
};
