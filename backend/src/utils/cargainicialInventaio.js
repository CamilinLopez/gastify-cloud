const moment = require("moment");
const now = new Date();

const inventarioInicial = [
  {
    fecha: moment(now).format("YYYY-MM-DD"),
    hora: moment(now).format("HH:mm:ss"),
    cantidad: 0,
    tipoCilindroId: 1,
    estadoCilindroId: 1,
  },
  {
    fecha: moment(now).format("YYYY-MM-DD"),
    hora: moment(now).format("HH:mm:ss"),
    cantidad: 0,
    tipoCilindroId: 1,
    estadoCilindroId: 2,
  },
  {
    fecha: moment(now).format("YYYY-MM-DD"),
    hora: moment(now).format("HH:mm:ss"),
    cantidad: 0,
    tipoCilindroId: 1,
    estadoCilindroId: 3,
  },
];

const tipoCilindros = [
  { id: 1, tipo: "5kg" },
  { id: 2, tipo: "11kg" },
  { id: 3, tipo: "15kg" },
  { id: 4, tipo: "45kg" },
  { id: 5, tipo: "H15" },
];

const estadoCilindros = [
  { id: 1, tipo: "Lleno" },
  { id: 2, tipo: "Vacío" },
  { id: 3, tipo: "Fallad" },
  { id: 4, tipo: "Prestado" },
];

module.exports = {
  inventarioInicial,
  tipoCilindros,
  estadoCilindros,
};
