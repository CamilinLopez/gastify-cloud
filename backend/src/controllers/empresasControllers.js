const { empresas } = require('../db/index');

const crearEmpresas = async (data) => {
  
  try {
    return await empresas.create(data);
  } catch (error) {
    throw error;
  }
};
const obtenerTodosEmpresas = async () => {
  try {
     return await empresas.findAll();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  crearEmpresas,
  obtenerTodosEmpresas
};
