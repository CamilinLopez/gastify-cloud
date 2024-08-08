const moment = require('moment');

const generateId = (length = 10) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const generarFechaActual = () => {
  const now = moment();

  const newFecha = moment(now).format('YYYY-MM-DD');
  return newFecha;
};

const generarHoraActual = () => {
  const now = moment();

  const newHora = moment(now).format('HH:mm:ss');
  return newHora;
};

module.exports = { generateId, generarFechaActual, generarHoraActual };
