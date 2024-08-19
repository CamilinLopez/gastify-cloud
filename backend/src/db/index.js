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
  modelVentas,
} = require('./models/inventario/index');

const { modelPermisos, modelRoles, modelRolesPermisos } = require('./models/roles/index');
const { modelEmpresa, modelUsuario } = require('./models/empresa/index');

const urlLocal = 'postgres://postgres:1010@localhost:5432/gastifycloud';
const urlDocker = 'postgres://protolylab:azsxdcfv@database:5432/gastifycloud';

//cambiar urlLocal por urlDocker para ejecutar el proyecto con docker.
// const database = new Sequelize(`${urlLocal}`, {
//   logging: false,
//   native: false,
// });
//
const database = new Sequelize(
  'postgresql://camilo:a68LZdADLnNeW6PZj8BzIaKk3WytTnVm@dpg-cr197jtds78s739qho60-a.oregon-postgres.render.com/gastifycloud_00um',
  {
    dialect: 'postgres',
    logging: false,
    native: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
);

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
modelVentas(database);

modelRoles(database);
modelPermisos(database);
modelRolesPermisos(database);

modelEmpresa(database);
modelUsuario(database);

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
  ventas,
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

camiones.hasMany(ventas, { foreignKey: 'camion_id', as: 'ventas' });
ventas.belongsTo(camiones, { foreignKey: 'camion_id', as: 'camion' });

conductores.hasMany(ventas, { foreignKey: 'conductor_id', as: 'conductor' });
ventas.belongsTo(conductores, { foreignKey: 'conductor_id', as: 'conductor' });

cargas.hasMany(ventas, { foreignKey: 'carga_id', as: 'ventas' });
ventas.belongsTo(cargas, { foreignKey: 'carga_id', as: 'carga' });

tipo_cilindros.hasMany(ventas, { foreignKey: 'tipoCilindroId', as: 'tipoCilindro' });
ventas.belongsTo(tipo_cilindros, { foreignKey: 'tipoCilindroId', as: 'tipoCilindro' });
// Modelos de roles y permisos
const { roles, permisos, roles_permisos } = database.models;

// Relaciones de roles y permisos
roles.belongsToMany(permisos, {
  through: roles_permisos, // Tabla intermedia
  foreignKey: 'rolId', // Clave foránea en RolePermission
  otherKey: 'permisoId', // Clave foránea en RolePermission
  as: 'permisos', // Alias para acceder a los permisos desde el rol
});

permisos.belongsToMany(roles, {
  through: roles_permisos, // Tabla intermedia
  foreignKey: 'permisoId', // Clave foránea en RolePermission
  otherKey: 'rolId', // Clave foránea en RolePermission
  as: 'roles', // Alias para acceder a los roles desde el permiso
});

// Modelos de empresas
const { empresas, usuarios } = database.models;

// Relaciones de empresas y usuarios
empresas.hasMany(usuarios, { foreignKey: 'empresaId', as: 'usuarios' });
usuarios.belongsTo(empresas, { foreignKey: 'empresaId', as: 'empresa' });

// Relaciones de usuarios y roles

usuarios.belongsTo(roles, {
  foreignKey: 'rolId',
  as: 'rol',
});

roles.hasMany(usuarios, {
  foreignKey: 'rolId',
  as: 'usuarios',
});

// console.log(Object.keys(database.models));

module.exports = {
  ...database.models,
  database,
};
