const {
  crearRoles,
  obtenerTodosRoles,
  asignarPermisoRoles, 
} = require('../controllers/rolesControllers');



const crearRol = async (req, res) => {
  try {
    const { nombre } = req.body;
    const data = await crearRoles({nombre});

    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
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

const asignarPermisoRol = async (req, res) => {
  try {
    const { rolId, permisoId } = req.body;

  
    const data = await asignarPermisoRoles({ rolId, permisoId });

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearRol,
  obtenerRoles,
  asignarPermisoRol
};
