const { alarmaCilindros, registrarAlarmasCilindros, leerAlarmas } = require('../controllers/alarmas');

const alarmasCilindrosHandlers = async (req, res) => {
  const { empresaId } = req.query;
  try {
    const data = await alarmaCilindros(empresaId);

    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

const crearAlarmasCilindrosHandler = async (req, res) => {
  const { array, empresaId } = req.body;
  try {
    const data = await registrarAlarmasCilindros(array, empresaId);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

const leerAlarmasHandlers = async (req, res) => {
  const { empresaId } = req.query;
  try {
    const data = await leerAlarmas(empresaId);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

module.exports = {
  alarmasCilindrosHandlers,
  crearAlarmasCilindrosHandler,
  leerAlarmasHandlers,
};
