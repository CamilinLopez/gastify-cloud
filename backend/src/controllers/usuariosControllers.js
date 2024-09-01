const { usuarios, roles, empresas } = require('../db/index');
const bcrypt = require('bcrypt');
const { generarFechaActual } = require('../utils/generadorId')

const crearUsuarioPasswordDB = async ({email, password, empresa,nombre}) => {
  try {
    const usuario = await usuarios.findOne({where:{email, empresaId:empresa}}) 
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    if(!usuario.verificado){
      const hashedPassword = await bcrypt.hash(password, 10);

      usuario.password = hashedPassword;
      usuario.verificado = true;
      usuario.nombre = nombre
      await usuario.save();
      return usuario

    }
    throw new Error('El usuario ya está verificado');

  } catch (error) {
    throw error;
  }
};



const obtenerTodosUsuarios = async () => {
  try {
    // const id = req.usuario.id
    const usuariosData = await usuarios.findAll({
      where: { activo: true }, 
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
    if (id) whereClause.id = id.trim();
    if (email) whereClause.email = email.trim();
    if (rolId) whereClause.rolId = rolId;

    if (Object.keys(whereClause).length === 0) {
      return []; 
    }
    whereClause.activo=true
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


const infoUserAutenthicate = async ({ id }) => {
  try {
    const empresa = await fetchEntity(empresas, id);
    if (empresa) return { type: 'empresa', empresa };

    const usuario = await fetchEntity(usuarios, id);
    if (usuario) return { type: 'usuario', usuario };

    throw new Error('Información no encontrada');
  } catch (error) {
    throw error;
  }
};


const deleteUser = async ({ id }) => {
  try {
    const usuario = await fetchEntity(usuarios, id);
    if (!usuario)
      throw new Error('uusario no encontrado');
    
    usuario.activo=false;
    usuario.eliminadoEn = generarFechaActual()
    await usuario.save()

    return { message: 'Usuario eliminado', usuario };

  } catch (error) {
    throw error;
  }
}



const fetchEntity = async (model, id) => {
  return model.findOne({
    where: { id },
    attributes: { exclude: ['password', 'fecha_registro', 'rolId'] },
    include: [
      {
        model: roles,
        as: 'rol',
        attributes: ['nombre'],
      },
    ],
  });
};
module.exports = {
  obtenerTodosUsuarios,
  crearUsuarioPasswordDB,
  obtenerTodosUsuariosFiltrado,
  infoUserAutenthicate,
  deleteUser
};
