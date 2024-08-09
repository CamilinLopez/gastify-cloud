const { transfereciaCilindros } = require('../controllers/operacioneControllers');

const realizarOperacionHandler = async (req, res) => {
  const { numero_movil, id_conductor, carga_cilindros } = req.body;

  try {
    const data = await transfereciaCilindros(numero_movil, id_conductor, carga_cilindros);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error)
    res.status(400).json({ errors: error });
  }
};

module.exports = {
  realizarOperacionHandler,
};
