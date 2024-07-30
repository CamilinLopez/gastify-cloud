const { Sequelize } = require('sequelize');
const {
  modelEstadocilindro,
  modelInventarioBodega,
  modelTipoCilindro,
  modelCamiones,
  modelConductores,
  modelInventarioCamiones,
} = require('./models/inventario/index');

const urlLocal = 'postgres://postgres:camilo1998@localhost:5432/gastifycloud';
const urlDocker = 'postgres://protolylab:azsxdcfv@database:5432/gastifycloud';

//cambiar urlLocal por urlDocker para ejecutar el proyecto con docker.
const database = new Sequelize(`${urlLocal}`, {
  logging: false,
  native: false,
});

//llamar modelos
modelEstadocilindro(database);
modelInventarioBodega(database);
modelTipoCilindro(database);
modelCamiones(database);
modelConductores(database);
modelInventarioCamiones(database);

//modelos de seccion inventario
const { estado_cilindros, inventario_bodegas, tipo_cilindros, camiones, conductores, inventario_camiones } = database.models;

//relaciones seccion inventario
inventario_bodegas.belongsTo(tipo_cilindros, { foreignKey: 'tipoCilindroId', as: 'tipoCilindro' });
inventario_bodegas.belongsTo(estado_cilindros, { foreignKey: 'estadoCilindroId', as: 'estadoCilindro' });


module.exports = {
  ...database.models,
  database,
};
