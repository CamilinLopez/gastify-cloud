const {
  crearRoles,
  obtenerTodosRoles,
   obtenerTodosPermisos,
   asignarPermisoRoles
} = require('../controllers/rolesControllers');
const { usuarios, empresas, roles, permisos } = require('../db/index');


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
    const data = await obtenerTodosRoles();

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

  
    const data = await asignarPermisoRoles({ rol:rolId, permiso:permisos  });

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const rolesPermisosUsuario = async (req, res) => {
  try {
    const userId = req.user.id;

    const usuario = await usuarios.findOne({
      where: { id: userId },
      attributes: { exclude: ['fecha_registro', 'rolId'] }, // Excluir campos no deseados
      include: [{
        model: roles,
        as: 'rol', 
        attributes: ['nombre'], // Excluir los campos no deseados del rol
        include: [{
          model: permisos,
          as: 'permisos',
          attributes: ['id', 'nombre'], // Selecciona solo los atributos deseados de permisos
          through: { attributes: [] } // Excluye los atributos de la tabla intermedia
        }]
      }]
    });

    if (usuario) {
      return res.status(200).json({ tipo: 'usuario', data: usuario });
    }

    // Buscar a la empresa con roles y permisos asociados
    const empresa = await empresas.findOne({
      where: { id: userId },
      attributes: { exclude: ['fecha_registro', 'rolId'] },
      include: [{
        model: roles,
        as: 'rol',
        attributes: ['nombre'],
        include: [{
          model: permisos,
          as: 'permisos',
          attributes: ['id', 'nombre'],
          through: { attributes: [] } // Excluye los atributos de la tabla intermedia
        }]
      }]
    });

    if (empresa) {
      return res.status(200).json({ tipo: 'empresa', data: empresa });
    }

    // Si no se encuentra ni usuario ni empresa
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
  rolesPermisosUsuario
};
