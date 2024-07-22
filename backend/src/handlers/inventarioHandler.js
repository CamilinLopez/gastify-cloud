const {
  crearDatosDB,
  crearActualizarInventarioDB,
  getAbastacemientoDB,
} = require('../controllers/inicializarInformacion');

const inicializarDatos = async (req, res) => {
  try {
    const data = await crearDatosDB();
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const crearAbastecimiento = async (req, res) => {
  try {
    const { id, fecha, hora, cantidad, tipoCilindro, estadoCilindro, modificar } = req.body;
    const data = await crearActualizarInventarioDB({
      id,
      fecha,
      hora,
      cantidad,
      tipoCilindro: { idCilindro: tipoCilindro.id, nombreCilindro: tipoCilindro.tipo },
      estadoCilindro: { idEstado: estadoCilindro.id, nombreEstado: estadoCilindro.tipo },
      modificar: { idModificar: modificar.id, nombreModificar: modificar.tipo },
    });

    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const getAbastacemiento = async (req, res) => {
  try {
    const data = await getAbastacemientoDB();
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  inicializarDatos,
  crearAbastecimiento,
  getAbastacemiento,
};
