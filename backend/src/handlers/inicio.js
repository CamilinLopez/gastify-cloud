const { getTablaResumenInventario, cilindrosVendidosPorDia, ventarPorMes } = require('../controllers/inicio');

const getTablaReportesDiariosHandler = async (req, res) => {
  const { empresaId } = req.query;
  try {
    const data = await getTablaResumenInventario(empresaId);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

const getCantidadVendidaPorDiaHandler = async (req, res) => {
  const { empresaId } = req.query;
  try {
    const data = await cilindrosVendidosPorDia(empresaId);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

const getVentaPorMesHandler = async (req, res) => {
  const { empresaId } = req.query;
  try {
    const data = await ventarPorMes(empresaId);
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
