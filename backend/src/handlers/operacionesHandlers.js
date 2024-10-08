const {
  transfereciaCilindros,
  TablaReportesDiarios,
  getTeblaVisualCargaDB,
  crearTablaDescargaDB,
  obtenerTablaDescargaDB,
  crearVentasDB,
  obtenerTablaVentas,
} = require('../controllers/operacioneControllers');

const realizarOperacionHandler = async (req, res) => {
  const { numero_movil, nombre_conductor, carga_cilindros, empresaId } = req.body;
  try {
    const data = await transfereciaCilindros(numero_movil.id, nombre_conductor.id, carga_cilindros, empresaId);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

const getTablaReportesDiariosHandler = async (req, res) => {
  const { empresaId } = req.query;
  try {
    const data = await TablaReportesDiarios(empresaId);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

const getTablaVisualCargasHandler = async (req, res) => {
  const { carga_id, empresaId } = req.query;
  try {
    const data = await getTeblaVisualCargaDB(carga_id, empresaId);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

const postTablaDescargaHalndler = async (req, res) => {
  const { carga_id, conductor, camion, tablaDescarga, empresaId } = req.body;
  try {
    const data = await crearTablaDescargaDB(carga_id, conductor, camion, tablaDescarga, empresaId);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

const getTablaDescargaHandler = async (req, res) => {
  const { carga_id, empresaId } = req.query;
  try {
    const data = await obtenerTablaDescargaDB(carga_id, empresaId);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

const postTablaVentasHandlres = async (req, res) => {
  const { camion, carga_id, conductor, tabla, empresaId } = req.body;
  try {
    const data = await crearVentasDB(camion, carga_id, conductor, tabla, empresaId);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errors: { error } });
  }
};

const getTablaVentas = async (req, res) => {
  const { carga_id, empresaId } = req.query;
  try {
    const data = await obtenerTablaVentas(carga_id, empresaId);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

module.exports = {
  realizarOperacionHandler,
  getTablaReportesDiariosHandler,
  getTablaVisualCargasHandler,
  postTablaDescargaHalndler,
  getTablaDescargaHandler,
  postTablaVentasHandlres,
  getTablaVentas,
};
