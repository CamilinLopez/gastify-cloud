const { getTablaResumenReportesDiariosDB } = require('../controllers/reportes');

const getTablaReportesDiariosHandler = async (req, res) => {
  const { fecha, conductor_id } = req.query;
  try {
    const data = await getTablaResumenReportesDiariosDB(fecha, conductor_id);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

module.exports = {
  getTablaReportesDiariosHandler,
};
