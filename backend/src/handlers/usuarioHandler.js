const {
  crearUsuarioPasswordDB,
  obtenerTodosUsuarios,
  obtenerTodosUsuariosFiltrado 
} = require('../controllers/usuariosControllers');

const { PAGE_URL } = require('../config/env')


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


const todosUsuariosFiltrado = async (req, res) => {
  try {
    const { id, email, rolId } = req.body;
    const data = await obtenerTodosUsuariosFiltrado({ id, email, rolId });

    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error.message });
  }
};




module.exports = {
  ingresarPassword,
  todosUsuarios,
  todosUsuariosFiltrado
};
