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
  modelDescarga,
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
modelDescarga(database);

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
  descarga_camiones,
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

// carga / descarga_camiones 1/n
cargas.hasMany(descarga_camiones, { foreignKey: 'carga_id' });
descarga_camiones.belongsTo(cargas, { foreignKey: 'carga_id' });

//camiones/ descarga_camones 1/n
camiones.hasMany(descarga_camiones, { foreignKey: 'camion_id' });
descarga_camiones.belongsTo(camiones, { foreignKey: 'camion_id' });

//conductores / descarga_camiones 1/n
conductores.hasMany(descarga_camiones, { foreignKey: 'conductor_id' });
descarga_camiones.belongsTo(conductores, { foreignKey: 'conductor_id' });

//tipo_cilindros / descarga_camiones 1/n
tipo_cilindros.hasMany(descarga_camiones, { foreignKey: 'tipo_cilindros' });
descarga_camiones.belongsTo(tipo_cilindros, { foreignKey: 'tipo_cilindros' });

//estado_cilindros / descarga_camiones 1/n
estado_cilindros.hasMany(descarga_camiones, { foreignKey: 'estado_cilindros' });
descarga_camiones.belongsTo(estado_cilindros, { foreignKey: 'estado_cilindros' });

module.exports = {
  ...database.models,
  database,
};
