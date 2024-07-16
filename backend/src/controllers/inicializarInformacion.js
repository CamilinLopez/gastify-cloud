const {
  estado_cilindros,
  tipo_cilindros,
  inventario_bodegas,
} = require("../db/index");
const moment = require("moment");

const crearDatosDB = async () => {
  const tipos = [
    { tipo: "5kg" },
    { tipo: "11kg" },
    { tipo: "15kg" },
    { tipo: "45kg" },
    { tipo: "H15" },
  ];
  const estados = [
    { estado: "Lleno" },
    { estado: "Vacío" },
    { estado: "Fallado" },
    { estado: "Prestado" },
  ];

  try {
    await tipo_cilindros.bulkCreate(tipos);
    await estado_cilindros.bulkCreate(estados);
    return "Tipos y estados de cilindros creados";
  } catch (error) {
    throw error;
  }
};

const crearActualizarInventarioDB = async ({
  cantidad,
  tipoCilindroId,
  estadoCilindroId,
}) => {
  try {
    const now = new Date();

    const data = {
      fecha: moment(now).format("YYYY-MM-DD"),
      hora: moment(now).format("HH:mm:ss"),
      cantidad,
      tipoCilindroId,
      estadoCilindroId,
    };

    const findTipoCilindro = await inventario_bodegas.findOne({
      where: { tipoCilindroId },
    });

    if (findTipoCilindro) {
      await inventario_bodegas.update(data, { where: { tipoCilindroId } });
      return "Datos actualizados.";
    }
    await inventario_bodegas.create(data);
    return "Datos creados.";
  } catch (error) {
    throw error;
  }
};

module.exports = {
  crearDatosDB,
  crearActualizarInventarioDB,
};
