const {
  crearUsuarios,
  crearUsuarioPasswordDB,
  obtenerTodosUsuarios
} = require('../controllers/usuariosControllers');

const { PAGE_URL } = require('../config/env')

const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, contraseña, empresaId } = req.body;

    const data = await crearUsuarios({nombre, email, contraseña, empresaId});

    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error.message });
  }
};

const ingresarPassword = async (req, res) => {
  try {
    const {email, password, empresa}= req.body;
    const data = await crearUsuarioPasswordDB({email, password, empresa});

    res.status(200).json({ usuario:data, dashboard:`${PAGE_URL}/dashboard/inicio` });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

const todosUsuarios = async (req, res) => {
  try {
    const data = await obtenerTodosUsuarios();

    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};





module.exports = {
  crearUsuario,
  ingresarPassword,
  todosUsuarios
};
