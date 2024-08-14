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



const crearUsuarioPasswordDB = async ({email, password, empresa}) => {
  try {
    const usuario = await usuarios.findOne({where:{email, empresaId:empresa}}) 

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Actualizar la contraseña del usuario
    usuario.password = hashedPassword;
    usuario.save()
    return usuario

  } catch (error) {
    throw error;
  }
};



const obtenerTodosUsuarios = async () => {
  try {
    const usuariosData = await usuarios.findAll({
      attributes: { exclude: ['rolId','password','empresaId'] }, 
      include: [
        {
          model: roles,
          as: 'rol', // Alias for the relationship
          attributes: ['nombre'], // Select specific fields if needed
        },
      ],
    });

    return usuariosData

  } catch (error) {
    throw error;
  }
};

module.exports = {
  crearUsuarios,
  obtenerTodosUsuarios,
  crearUsuarioPasswordDB
};
