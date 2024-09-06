const { alarmaCilindros, registrarAlarmasCilindros } = require('../controllers/alarmas');

const alarmasCilindrosHandlers = async (req, res) => {
  try {
    const data = await alarmaCilindros();

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

module.exports = {
  alarmasCilindrosHandlers,
  crearAlarmasCilindrosHandler,
};
