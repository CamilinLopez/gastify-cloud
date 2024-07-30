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

modelRoles(database);
modelPermisos(database);
modelRolesPermisos(database);

modelEmpresa(database);
modelUsuario(database);

//modelos de seccion inventario
const { estado_cilindros, inventario_bodegas, tipo_cilindros, camiones, conductores, inventario_camiones } = database.models;

//relaciones seccion inventario
inventario_bodegas.belongsTo(tipo_cilindros, { foreignKey: 'tipoCilindroId', as: 'tipoCilindro' });
inventario_bodegas.belongsTo(estado_cilindros, { foreignKey: 'estadoCilindroId', as: 'estadoCilindro' });


// Modelos de roles y permisos
const { roles, permisos, roles_permisos } = database.models;

// Relaciones de roles y permisos
roles.belongsToMany(permisos, {
  through: roles_permisos,   // Tabla intermedia
  foreignKey: 'rolId',      // Clave foránea en RolePermission
  otherKey: 'permisoId',  // Clave foránea en RolePermission
  as: 'permisos'          // Alias para acceder a los permisos desde el rol
});

permisos.belongsToMany(roles, {
  through: roles_permisos,   // Tabla intermedia
  foreignKey: 'permisoId',// Clave foránea en RolePermission
  otherKey: 'rolId',        // Clave foránea en RolePermission
  as: 'roles'                // Alias para acceder a los roles desde el permiso
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
