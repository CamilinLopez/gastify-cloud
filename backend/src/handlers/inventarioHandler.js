const {
  getTablaInventarioBodegaDB,
  registrarConductorDB,
  getTablaConductores,
  registrarCamionesDB,
  tomarTablaCamionesDB,
  eliminarConductorDB,
  eliminarCamionDB,
} = require('../controllers/inventarioControllers');

const eliminarConductorHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await eliminarConductorDB(id);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

const eliminarCamionHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await eliminarCamionDB(id);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

const getTablaInventarioBodegaHandler = async (req, res) => {
  const { fecha, empresaId } = req.query;
  try {
    const data = await getTablaInventarioBodegaDB({ fecha, empresaId });
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

const crearConductorHandler = async (req, res) => {
  const { nombre, licencia, empresaId } = req.body;
  try {
    const data = await registrarConductorDB(nombre, licencia, empresaId);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

const tomarTablaConductores = async (req, res) => {
  const { empresaId } = req.query;
  try {
    const data = await getTablaConductores(empresaId);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

const crearCamionesHandler = async (req, res) => {
  const { marca, modelo, placa, capacidad_carga, empresaId } = req.body;
  try {
    const data = await registrarCamionesDB(marca, modelo, placa, capacidad_carga, empresaId);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

const tomarTablaCamiones = async (req, res) => {
  const { empresaId } = req.query;
  try {
    const data = await tomarTablaCamionesDB(empresaId);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

module.exports = {
  getTablaInventarioBodegaHandler,
  crearConductorHandler,
  tomarTablaConductores,
  crearCamionesHandler,
  tomarTablaCamiones,
  eliminarConductorHandler,
  eliminarCamionHandler,
};
