const { crearDatosDB } = require("../controllers/inicializarInformacion");

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
    const { cantidad, tipoCilindro, estadoCilindro } = req.body;
    const now = new Date();
    const data = {
      cantidad,
      tipoCilindro,
      estadoCilindro,
      fecha: now.toLocaleDateString(),
      hora: now.toLocaleTimeString(),
    };

    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  inicializarDatos,
  crearInventario,
};
