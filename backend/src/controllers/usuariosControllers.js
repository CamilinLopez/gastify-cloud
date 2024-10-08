const { usuarios, roles, empresas, usuario_permiso, permisos } = require('../db/index');
const bcrypt = require('bcrypt');
const { generarFechaActual } = require('../utils/generadorId');

const crearUsuarioPasswordDB = async ({ email, password, empresa, nombre }) => {
  try {
    // Buscar al usuario en la base de datos
    const usuario = await usuarios.findOne({
      where: { email, empresaId: empresa, activo: true },
    });

    // Si el usuario no existe, lanzar un error
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    // Si el usuario no ha sido verificado, proceder con la verificación
    if (usuario) {
      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Actualizar los datos del usuario
      usuario.password = hashedPassword;
      usuario.verificado = true;
      usuario.nombre = nombre;
      await usuario.save();

      // Buscar los permisos asignados al rol del usuario en la empresa
      let permisosRol = await usuario_permiso.findAll({
        where: {
          empresaId: usuario.empresaId, // Empresa a la que pertenece el usuario
          rolId: usuario.rolId, // Rol asignado al usuario
        },
        include: [
          { model: permisos, as: 'permiso' }, // Incluir el modelo de permisos
          { model: roles, as: 'rol' }, // Incluir el modelo de roles
        ],
      });

      // Si no hay permisos asignados al rol, asignar permisos por defecto
      if (!permisosRol || permisosRol.length === 0) {
        await usuario_permiso.create({
          empresaId: usuario.empresaId,
          permisoId: 1,
          usuarioId: usuario.id,
          rolId: usuario.rolId,
        });
      } else {
        // Crear un array con los permisos para asignar al usuario
        const permisosUsuario = permisosRol.map((data) => ({
          empresaId: usuario.empresaId,
          usuarioId: usuario.id,
          permisoId: data.permisoId || data.permiso.id, // ID del permiso asignado o por defecto
          rolId: usuario.rolId, // Rol del usuario
        }));
        // Insertar los permisos en la tabla usuario_permiso para este usuario
        await usuario_permiso.bulkCreate(permisosUsuario);
      }

      // Devolver el usuario actualizado
      return usuario;
    }

    // Si el usuario ya está verificado, lanzar un error
    throw new Error('El usuario ya está verificado');
  } catch (error) {
    // Manejo de errores
    throw error;
  }
};

const obtenerTodosUsuarios = async ({ req }) => {
  try {
    const id = req.user.id;
    let idGlobal = null;

    const empresa = (await empresas.findOne({ where: { id } })) || (await usuarios.findOne({ where: { id, activo: true } }));

    idGlobal = empresa.empresaId;
    if (!empresa.empresaId) idGlobal = id;

    let usuariosData;
    if (empresa) {
      usuariosData = await usuarios.findAll({
        where: { activo: true, empresaId: idGlobal },
        attributes: { exclude: ['rolId', 'password', 'empresaId'] },
        include: [
          {
            model: roles,
            as: 'rol', // Alias for the relationship
            attributes: ['nombre'], // Select specific fields if needed
          },
        ],
      });
    } else {
      usuariosData = await usuarios.findAll({
        where: { activo: true, empresaId: empresa.empresaId },
        attributes: { exclude: ['rolId', 'password', 'empresaId'] },
        include: [
          {
            model: roles,
            as: 'rol', // Alias for the relationship
            attributes: ['nombre'], // Select specific fields if needed
          },
        ],
      });
    }

    return usuariosData;
  } catch (error) {
    throw error;
  }
};

const obtenerTodosUsuariosFiltrado = async ({ id, email, rolId, empresaId }) => {
  try {
    const whereClause = {};
    // Agrega condiciones de búsqueda si los parámetros están presentes
    whereClause.empresaId = empresaId; // agregar el id de la empresa para solo sacar los usuarios correspondientes a cada empresa
    if (id) whereClause.id = id.trim();
    if (email) whereClause.email = email.trim();
    if (rolId) whereClause.rolId = rolId;

    if (Object.keys(whereClause).length === 0) {
      return [];
    }
    whereClause.activo = true;
    const usuariosData = await usuarios.findAll({
      where: whereClause,

      attributes: { exclude: ['password', 'empresaId', 'rolId'] },
      include: [
        {
          model: roles, // Asegúrate de importar el modelo Role
          as: 'rol', // Debe coincidir con el alias en la relación definida
          attributes: ['nombre'], // Campos específicos del rol que deseas incluir
        },
      ],
    });
    return usuariosData;
  } catch (error) {
    throw error;
  }
};

const infoUserAutenthicate = async ({ id }) => {
  try {
    const empresa = await fetchEntity(empresas, id);
    if (empresa) return { type: 'empresa', empresa };

    const usuario = await fetchEntity(usuarios, id);
    if (usuario) return { type: 'usuario', usuario };

    throw new Error('Información no encontrada');
  } catch (error) {
    throw error;
  }
};

const deleteUser = async ({ id }) => {
  try {
    const usuario = await fetchEntity(usuarios, id);
    if (!usuario) throw new Error('uusario no encontrado');

    usuario.activo = false;
    usuario.eliminadoEn = generarFechaActual();
    await usuario.save();

    return { message: 'Usuario eliminado', usuario };
  } catch (error) {
    throw error;
  }
};

const fetchEntity = async (model, id) => {
  return model.findOne({
    where: { id },
    attributes: { exclude: ['password', 'fecha_registro', 'rolId'] },
    include: [
      {
        model: roles,
        as: 'rol',
        attributes: ['nombre', 'id'],
      },
    ],
  });
};
module.exports = {
  obtenerTodosUsuarios,
  crearUsuarioPasswordDB,
  obtenerTodosUsuariosFiltrado,
  infoUserAutenthicate,
  deleteUser,
};
