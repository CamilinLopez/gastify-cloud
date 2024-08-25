const { usuarios, roles } = require('../db/index');
const bcrypt = require('bcrypt');


const crearUsuarioPasswordDB = async ({email, password, empresa}) => {
  try {
    const usuario = await usuarios.findOne({where:{email, empresaId:empresa}}) 

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Actualizar la contraseña del usuario
    usuario.password = hashedPassword;
    usuario.verificado = true;
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


const obtenerTodosUsuariosFiltrado = async ({ id, email, rolId }) => {
  try {
    const whereClause = {};

    // Agrega condiciones de búsqueda si los parámetros están presentes
    if (id && id.trim() !== "") whereClause.id = id;
    if (email && email.trim() !== "") whereClause.email = email;
    if (rolId && rolId.trim() !== "") whereClause.rolId = rolId;

    if (Object.keys(whereClause).length === 0) {
      return []; 
    }

    const usuariosData = await usuarios.findAll({
      where: whereClause,
      attributes: { exclude: ['password', 'empresaId','rolId'] },
      include: [
        {
          model: roles, // Asegúrate de importar el modelo Role
          as: 'rol', // Debe coincidir con el alias en la relación definida
          attributes: ['nombre'], // Campos específicos del rol que deseas incluir
        },
      ],
    });
    return usuariosData;

  } catch (error) {
    throw error;
  }
};


module.exports = {
  obtenerTodosUsuarios,
  crearUsuarioPasswordDB,
  obtenerTodosUsuariosFiltrado
};
