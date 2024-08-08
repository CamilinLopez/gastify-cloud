const { Sequelize } = require('sequelize');
const {
  modelEstadocilindro,
  modelInventarioBodega,
  modelTipoCilindro,
  modelCamiones,
  modelConductores,
  modelInventarioCamiones,
  modelCarga,
  modelDetallesCarga,
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
modelCarga(database);
modelDetallesCarga(database);

//modelos de seccion inventario
const {
  estado_cilindros,
  inventario_bodegas,
  tipo_cilindros,
  camiones,
  conductores,
  inventario_camiones,
  cargas,
  detalle_cargas,
} = database.models;


//inventario_bodegas / tipo_cilindros N/1
inventario_bodegas.belongsTo(tipo_cilindros, { foreignKey: 'tipoCilindroId', as: 'tipoCilindro' });
//inventario_bodegas / estado_cilindros N/1
inventario_bodegas.belongsTo(estado_cilindros, { foreignKey: 'estadoCilindroId', as: 'estadoCilindro' });

//camiones / inventario_camiones 1/N
camiones.hasMany(inventario_camiones, { foreignKey: 'camionId' });
inventario_camiones.belongsTo(camiones, { foreignKey: 'camionId' });

//tipo_cilindros / inventario_camiones 1/N
tipo_cilindros.hasMany(inventario_camiones, { foreignKey: 'tipoCilindroId' });
inventario_camiones.belongsTo(tipo_cilindros, { foreignKey: 'tipoCilindroId' });

//conductores / carga 1/N
conductores.hasMany(cargas, { foreignKey: 'conductor_id' });
cargas.belongsTo(conductores, { foreignKey: 'conductor_id' });

// Un Camion puede tener muchas Cargas
camiones.hasMany(cargas, { foreignKey: 'camion_id' });
cargas.belongsTo(camiones, { foreignKey: 'camion_id' });

// Un TipoCilindro puede estar en muchas DetalleCarga
tipo_cilindros.hasMany(detalle_cargas, { foreignKey: 'tipoCilindroId' });
detalle_cargas.belongsTo(tipo_cilindros, { foreignKey: 'tipoCilindroId' });

// Un EstadoCilindro puede estar en muchas DetalleCarga
estado_cilindros.hasMany(detalle_cargas, { foreignKey: 'estadoCilindroId' });
detalle_cargas.belongsTo(estado_cilindros, { foreignKey: 'estadoCilindroId' });

module.exports = {
  ...database.models,
  database,
};
