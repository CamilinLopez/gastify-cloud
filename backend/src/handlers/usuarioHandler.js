const {
  crearUsuarioPasswordDB,
  obtenerTodosUsuarios,
  obtenerTodosUsuariosFiltrado,
  infoUserAutenthicate,
  deleteUser 
} = require('../controllers/usuariosControllers');
const { generateToken } = require('../helpers/generateToken')
const { PAGE_URL, SECRET_KEY } = require('../config/env')


const ingresarPassword = async (req, res) => {
  try {
    const {email, password, empresa, nombre}= req.body;
    const data = await crearUsuarioPasswordDB({email, password, empresa, nombre});

    const token = await generateToken({ id: data.id }, SECRET_KEY);

    res.status(200).json({ token:token.authentication ,usuario:data, dashboard:`${PAGE_URL}/dashboard/inicio` });

  } catch (error) {
    res.status(400).json({ errors: error.message });
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


const todosUsuariosFiltrado = async (req, res) => {
  try {
    const { id, email, rolId } = req.body;
    const data = await obtenerTodosUsuariosFiltrado({ id, email, rolId });

    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error.message });
  }
};


const usuarioAutenticado = async (req, res) => {
  try {
    userId = req.user.id
    console.log(userId)
    const data = await infoUserAutenthicate({ id:userId });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ errors: error.message });
  }
};


const eliminarUsuario = async (req, res) => {
  try {
    const {userId} = req.params;
    const data = await deleteUser({ id:userId });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ errors: error.message });
  }
};
module.exports = {
  ingresarPassword,
  todosUsuarios,
  todosUsuariosFiltrado,
  usuarioAutenticado,
  eliminarUsuario
};
