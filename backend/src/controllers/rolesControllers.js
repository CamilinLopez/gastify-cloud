const { roles, permisos, roles_permisos } = require('../db/index');

const crearRoles = async (data) => {
  
  try {
    return await roles.create(data);
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

const asignarPermisoRoles = async ({ rolId, permisoId }) => {
  try {
     // Buscar el rol por ID
     const rol = await roles.findByPk(rolId);
     if (!rol) {
      throw new Error('Rol no encontrado');
    }
 
     // Buscar el permiso por ID
     const permiso = await permisos.findByPk(permisoId);
     if (!permiso) {
      throw new Error('Permiso no encontrado');
    }
 
     // Asignar el permiso al rol
     await rol.addPermiso(permiso);
 
     // Recargar el rol con los permisos actuales
    await rol.reload({
      include: {
        model: permisos,
        as: 'permisos', // Asegúrate de usar el alias definido
        attributes: ['id', 'nombre'],
      },
    });


     // Responder con éxito
     return { message: 'Permiso asignado correctamente al rol',rol };
  } catch (error) {
    throw new Error(`Error al asignar el permiso: ${error.message}`);
  }
};


module.exports = {
  crearRoles,
  obtenerTodosRoles,
  asignarPermisoRoles
};
