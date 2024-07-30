const {
  crearUsuarios,
  
} = require('../controllers/usuariosControllers');



const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, contraseña, empresaId } = req.body;

    const data = await crearUsuarios({nombre, email, contraseña, empresaId});

    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error.message });
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
  crearUsuario,
  obtenerEmpresas
};
