const { roles, permisos, roles_permisos } = require('../db/index');

const crearRoles = async () => {
  try {
    const role = [{ nombre: 'Administrador' }, { nombre: 'Supervisor' }, { nombre: 'Bodeguero' }];

    const permission = [
      { nombre: 'inicio' },
      { nombre: 'inventario' },
      { nombre: 'operaciones diarias' },
      { nombre: 'reportes' },
      { nombre: 'abastecimiento' },
      { nombre: 'usuarios y permisos' },
    ];

    await roles.bulkCreate(role);
    await permisos.bulkCreate(permission);

    // Buscar el rol de Administrador
    const adminRole = await roles.findOne({ where: { nombre: 'Administrador' } });

    if (!adminRole) {
      throw new Error('Rol de Administrador no encontrado');
    }

    // Obtener todos los permisos
    const allPermissions = await permisos.findAll();

    // Asignar todos los permisos al rol de Administrador
    await adminRole.addPermisos(allPermissions);

    return 'Roles y permisos creados exitosamente, y permisos asignados al Administrador';
  } catch (error) {
    throw error;
  }
};

const obtenerTodosRoles = async () => {
  try {
    return await roles.findAll({
      include: {
        model: permisos,
        as: 'permisos', // Usa el alias definido
        attributes: ['nombre'], // Opcional: limita los atributos del permiso
        through: {
          attributes: [], // Excluye los atributos de la tabla intermedia
        },
      },
    });
  } catch (error) {
    throw error;
  }
};

const obtenerTodosPermisos = async () => {
  try {
    return await permisos.findAll({
      attributes: ['nombre', 'id'], // Opcional: limita los atributos del permiso
      through: {
        attributes: [], // Excluye los atributos de la tabla intermedia
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  crearRoles,
  obtenerTodosRoles,
  obtenerTodosPermisos,
};
