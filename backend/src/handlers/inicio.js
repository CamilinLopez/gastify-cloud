const { getTablaResumenInventario, cilindrosVendidosPorDia, ventarPorMes } = require('../controllers/inicio');

const getTablaReportesDiariosHandler = async (req, res) => {
  try {
    const data = await getTablaResumenInventario();
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

const getCantidadVendidaPorDiaHandler = async (req, res) => {
  try {
    const data = await cilindrosVendidosPorDia();
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

const getVentaPorMesHandler = async (req, res) => {
  try {
    const data = await ventarPorMes();
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

module.exports = {
  getTablaReportesDiariosHandler,
  getCantidadVendidaPorDiaHandler,
  getVentaPorMesHandler,
};
