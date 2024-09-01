const { roles, permisos } = require('../db/index');

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
        attributes: ['nombre','id'], // Opcional: limita los atributos del permiso
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


const asignarPermisoRoles = async ({ rol, permiso }) => {
  try {
    // Encuentra el rol por ID
    const role = await roles.findByPk(rol);

    if (!role) {
      throw new Error('Rol no encontrado');
    }

    // Asigna los permisos al rol, sobrescribiendo los permisos actuales
    await role.setPermisos(permiso);

    // Opción para añadir permisos sin eliminar los anteriores:
    // await rol.addPermisos(permisos);

    // Opcional: devuelve el rol con los permisos asignados para verificar
    const rolConPermisos = await roles.findByPk(rol, {
      include: [{
        model: permisos,
        as: 'permisos', // Aquí especificamos el alias usado en la asociación
        attributes: ['id', 'nombre'], // Muestra solo id y nombre de los permisos
        through: { attributes: [] } // Excluye atributos de la tabla intermedia
      }]
    });


    return rolConPermisos;

  } catch (error) {
    console.error('Error asignando permisos al rol:', error.message);
    throw error;
  }
};


module.exports = {
  crearRoles,
  obtenerTodosRoles,
  obtenerTodosPermisos,
  asignarPermisoRoles
};
