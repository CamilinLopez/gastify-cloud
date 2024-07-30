const { usuarios, empresas, roles } = require('../db/index');
const bcrypt = require('bcrypt');

const crearUsuarios = async (data) => {
  try {
    const empresa = await empresas.findByPk(data.empresaId);
    if (!empresa) {
      throw new Error('Empresa no encontrado');
    }

    // Hashear la contraseña
    data.contraseña = await bcrypt.hash(data.contraseña, 10);
    
    // Crear el nuevo usuario
    const nuevoUsuario = await usuarios.create(data);

    const usuarioConEmpresa = await usuarios.findByPk(nuevoUsuario.id, {
      include: [
        {
          model: empresas,
          as: 'empresa',
          attributes: ['nombre' ],
        },
      ],
    });

    return usuarioConEmpresa;
  } catch (error) {
    throw error;
  }
};

const obtenerTodosUsuarios = async () => {
  try {
    return await usuarios.findAll();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  crearUsuarios,
  obtenerTodosUsuarios,
};
