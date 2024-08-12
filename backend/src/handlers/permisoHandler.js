const {
  crearPermiso,
  ObtenerTodosPermisos
} = require('../controllers/permisosControllers');



const crearPermisos = async (req, res) => {
  try {
    const { nombre } = req.body;
    const data = await crearPermiso({nombre});

    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

const obtenerPermisos = async (req, res) => {
  try {
    const data = await ObtenerTodosPermisos();

    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};



module.exports = {
  crearPermisos,
  obtenerPermisos
};
