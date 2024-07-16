const { crearDatosDB, crearActualizarInventarioDB } = require('../controllers/inicializarInformacion');

const inicializarDatos = async (req, res) => {
  try {
    const data = await crearDatosDB();
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const crearInventario = async (req, res) => {
  try {
    const { cantidad, tipoCilindroId, estadoCilindroId } = req.body;
    const data = await crearActualizarInventarioDB({
      cantidad,
      tipoCilindroId,
      estadoCilindroId,
    });

    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  inicializarDatos,
  crearInventario,
};
