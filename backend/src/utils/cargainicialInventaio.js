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

module.exports = {
  inventarioInicial,
};
