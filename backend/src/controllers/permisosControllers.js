const { permisos } = require('../db/index');

const crearPermiso = async (data) => {
  try {
    return await permisos.create(data);
  } catch (error) {
    throw error;
  }
};

const ObtenerTodosPermisos = async () => {
  try {
    return await permisos.findAll();;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  crearPermiso,
  ObtenerTodosPermisos
};
