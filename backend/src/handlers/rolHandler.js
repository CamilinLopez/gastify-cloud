const { where } = require('sequelize');
const { crearRoles, obtenerTodosRoles, obtenerTodosPermisos, asignarPermisoRoles } = require('../controllers/rolesControllers');
const { usuarios, empresas, roles, permisos, roles_permisos, usuario_permiso } = require('../db/index');

const crearRol = async (req, res) => {
  try {
    const data = await crearRoles();

    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error.message });
  }
};

const obtenerRoles = async (req, res) => {
  try {
    const data = await obtenerTodosRoles({ id: req.user.id });

    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

const obtenerPermisos = async (req, res) => {
  try {
    const data = await obtenerTodosPermisos();

    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

const asignarPermisoRol = async (req, res) => {
  try {
    const { rolId } = req.params;
    const { permisos } = req.body;

    const id = req.user.id;

    //esta seccion se asegura de obtener el id de la empresa que se asocia con el usuario para que el usuario pueda hacer cambios con el id de la empresa
    let idGlobal = null;
    const user = await usuarios.findOne({ where: { id } });
    idGlobal = id;
    if (user) idGlobal = user.dataValues.empresaId;
    /////////////////////////////////////////////////////////////////////////////////////


    const data = await asignarPermisoRoles({ rol: rolId, permiso: permisos, id: idGlobal });

    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const rolesPermisosUsuario = async (req, res) => {
  try {
    const userId = req.user.id;
    const usuario = await usuario_permiso.findAll({
      where: {
        usuarioId: userId,
      },
      include: [
        { model: permisos, as: 'permiso' },
        { model: roles, as: 'rol' },
      ],
    });

    if (usuario.length > 0) {
      const user = await usuarios.findOne({ where: { id: userId, activo: true } });
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado o inactivo' });
      }

      // Obtener los permisos actualizados basados en el rol del usuario
      const permisosRol = await usuario_permiso.findAll({
        where: {
          rolId: user.rolId,
          empresaId: user.empresaId,
        },
        include: [
          { model: permisos, as: 'permiso' },
          { model: roles, as: 'rol' },
        ],
      });

      // Crear o actualizar los permisos del usuario
      const permisosUsuario = permisosRol.map((data) => ({
        empresaId: user.empresaId,
        usuarioId: user.id,
        permisoId: data.permiso.id, // ID del permiso asignado al rol
        rolId: user.rolId, // Rol del usuario
      }));

      // Mapear los permisos asignados para la respuesta
      const rolesUsuario = permisosRol.map((up) => ({
        rolId: up.rol.id,
        id: up.permiso.id,
        nombre: up.permiso.nombre,
      }));

      // Enviar la respuesta con los permisos actualizados
      return res.status(200).json({ tipo: 'usuario', data: rolesUsuario });
    }

    const empresa = await usuario_permiso.findAll({
      where: {
        empresaId: userId,
      },
      include: [
        {
          model: permisos,
          as: 'permiso',
        },
        {
          model: roles,
          as: 'rol',
        },
      ],
    });

    if (empresa.length > 0) {
      const rolesEmpresa = empresa.map((up) => ({
        rolId: up.rol.id,
        id: up.permiso.id,
        nombre: up.permiso.nombre,
      }));

      return res.status(200).json({ tipo: 'empresa', data: rolesEmpresa });
    }

    res.status(404).json({ message: 'Usuario o empresa no encontrado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearRol,
  obtenerRoles,
  asignarPermisoRol,
  obtenerPermisos,
  rolesPermisosUsuario,
};
