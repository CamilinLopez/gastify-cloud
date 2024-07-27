const { getTablaInventarioBodegaDB } = require('../controllers/inventarioControllers');

const getTablaInventarioBodegaHandler = async (req, res) => {
  const fecha = req.query.fecha;
  try {
    const data = await getTablaInventarioBodegaDB(fecha);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

module.exports = {
  getTablaInventarioBodegaHandler,
};
