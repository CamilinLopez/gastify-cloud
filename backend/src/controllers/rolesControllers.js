const { roles, permisos, usuario_permiso, empresas } = require('../db/index');
const { Op } = require('sequelize');  

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
    const adminRole = await roles.findOne({where:{nombre:'Administrador'}});
    const supervisorRole = await roles.findOne({where:{nombre:'Supervisor'}});
    const bodegueroRole = await roles.findOne({where:{nombre:'Bodeguero'}});

    // Obtener todos los permisos
    const allPermissions = await permisos.findAll();

    // Asignar todos los permisos al rol de Administrador
    await adminRole.addPermisos(allPermissions);
    await supervisorRole.addPermisos(allPermissions);
    await bodegueroRole.addPermisos(allPermissions);

    return 'Roles y permisos creados exitosamente, y permisos asignados al Administrador';
  } catch (error) {
    throw error;
  }
};

const obtenerTodosRoles = async ({id}) => {
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


const asignarPermisoRoles = async ({ rol, permiso, id }) => {
  try {
    const role = await roles.findByPk(rol);
    if (!role) {
      throw new Error('Rol no encontrado');
    }

    // Buscar empresa o usuario por ID
    const empresa = await empresas.findByPk(id) || await usuarios.findByPk(id);
    if (!empresa) {
      throw new Error('Empresa o Usuario no encontrado');
    }

    // Verificar si ya hay permisos asignados
    const permisosAsignados = await usuario_permiso.findAll({
      where: {
        empresaId: id,
        rolId: rol,
        usuarioId:null,
      }
    });

    // Si ya hay permisos asignados para el rol en esta empresa/usuario, actualizar en vez de eliminar

    if (permisosAsignados.length > 0 ) {

        // 1. Eliminar permisos que NO estén en el array `permiso`
    await usuario_permiso.destroy({
      where: {
        empresaId: id,
        rolId: role.id,
        // usuarioId: null,
        permisoId: {
          [Op.notIn]: permiso,  // Eliminar permisos que NO están en el array
        },
      },
    });

    // 2. Crear los permisos que están en el array `permiso`
    for (const permisoId of permiso) {
      await usuario_permiso.findOrCreate({
        where: {
          empresaId: id,
          permisoId,
          rolId: role.id,
          usuarioId: null,  // Si tienes un campo de usuario relacionado
        },
        defaults: {
          empresaId: id,
          permisoId,
          rolId: role.id,
          usuarioId: null,
        },
      });
    }

     
    } else {

      // Asignar los permisos por primera vez
      for (const permisoId of permiso) {
        await usuario_permiso.create({
          empresaId: id,
          permisoId,
          rolId: role.id,
        });
      }
    }

    // Obtener todos los permisos asignados a la empresa/usuario
    const permisosEmpresa = await usuario_permiso.findAll({
      where: {
        empresaId: id,
      },
      include: [
        { model: permisos, as: 'permiso' },
        { model: roles, as: 'rol' },
      ],
    });

    // Formatear la respuesta
    const permisosConIdYNombre = permisosEmpresa.map(up => ({
      rolId: up.rol.id,
      id: up.permiso.id,
      nombre: up.permiso.nombre,
    }));

    return { role, permisos: permisosConIdYNombre };

  } catch (error) {
    throw error;
  }
};



module.exports = {
  crearRoles,
  obtenerTodosRoles,
  obtenerTodosPermisos,
  asignarPermisoRoles
};
