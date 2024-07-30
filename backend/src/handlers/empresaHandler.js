const {
  crearEmpresas,
  obtenerTodosEmpresas
} = require('../controllers/empresasControllers');



const crearEmpresa = async (req, res) => {
  try {
    const { nombre, direccion, telefono, email, fecha_registro } = req.body;

    const data = await crearEmpresas({nombre, direccion, telefono, email, fecha_registro});

    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

const obtenerEmpresas = async (req, res) => {
  try {
    const data = await obtenerTodosEmpresas();

    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};





module.exports = {
  crearEmpresa,
  obtenerEmpresas
};
