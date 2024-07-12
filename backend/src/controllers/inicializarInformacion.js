const {
  estado_cilindros,
  tipo_cilindros,
  inventario_bodega,
} = require("../db/index");
const { inventarioInicial } = require("../utils/cargainicialInventaio");

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
    await inventario_bodega.bulkCreate(inventarioInicial);
    return "Tipos y estados de cilindros creados";
  } catch (error) {
    throw error;
  }
};

const crearInventarioDB = async ({
  cantidad,
  tipoCilindro,
  estadoCilindro,
}) => {
  try {
  } catch (error) {}
};

module.exports = {
  crearDatosDB,
};
