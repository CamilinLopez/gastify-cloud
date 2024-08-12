const { transfereciaCilindros, TablaReportesDiarios, getTeblaVisualCargaDB } = require('../controllers/operacioneControllers');

const realizarOperacionHandler = async (req, res) => {
  const { numero_movil, nombre_conductor, carga_cilindros } = req.body;

  try {
    const data = await transfereciaCilindros(numero_movil.id, nombre_conductor.id, carga_cilindros);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

const getTablaReportesDiariosHandler = async (req, res) => {
  try {
    const data = await TablaReportesDiarios();
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

const getTablaVisualCargasHandler = async (req, res) => {
  const { carga_id } = req.query;
  try {
    const data = await getTeblaVisualCargaDB(carga_id);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

module.exports = {
  realizarOperacionHandler,
  getTablaReportesDiariosHandler,
  getTablaVisualCargasHandler,
};
