const { usuarios, empresas, roles } = require('../db/index');
const { generateToken } = require('../helpers/generateToken')
const sendMailerVerificationLink = require('../helpers/sendEmail')
const { SECRET_KEY, WEBS_URL } = require('../config/env')

const invateUser = async (data) => {
  try {    
    // Verificar si el ID pertenece a una empresa
    const empresa = await empresas.findOne({ where: { id: data.empresaId } });

    if (empresa) {
      // Si es una empresa, realizar la lógica relacionada a la empresa

      // Crear el usuario y asociarlo a la empresa
      const usuario = await usuarios.create(data);

      // Obtener detalles del usuario sin algunos campos sensibles
      const usuarioData = await usuarios.findOne({
        where: { id: usuario.id },
        attributes: { exclude: ['rolId', 'password', 'empresaId'] },
        include: [
          {
            model: roles,
            as: 'rol',
            attributes: ['nombre'], // Select specific fields from roles
          },
        ],
      });

      const { authentication } = generateToken({ id: usuario.id }, SECRET_KEY);

      // Enviar el email de verificación asociado a la empresa
      const send = await sendMailerVerificationLink(
        usuario.email,
        WEBS_URL,
        empresa // Información de la empresa
      );

      if (!send) {
        throw new Error('No se pudo enviar el email');
      }

      return { message: 'Email enviado', authentication, usuarioData };

    } 


    const usuarioDB = await usuarios.findOne({ where: { id: data.empresaId } });

    if(usuarioDB) {
      // Si no es una empresa, se asume que es un usuario individual

      // Crear el usuario sin asociarlo a ninguna empresa
      const usuario = await usuarios.create({
        ...data,
        empresaId: usuarioDB.empresaId, // No se asocia a ninguna empresa
      });
      const empresa = await empresas.findOne({ where: { id: usuarioDB.empresaId } });


      const usuarioData = await usuarios.findOne({
        where: { id: usuario.id },
        attributes: { exclude: ['rolId', 'password', 'empresaId'] },
        include: [
          {
            model: roles,
            as: 'rol',
            attributes: ['nombre'], // Select specific fields from roles
          },
        ],
      });

      const { authentication } = generateToken({ id: usuario.id }, SECRET_KEY);

      // Enviar el email de verificación para un usuario individual
      const send = await sendMailerVerificationLink(
        usuario.email,
        WEBS_URL,
        empresa
      );

      if (!send) {
        throw new Error('No se pudo enviar el email');
      }

      return { message: 'Email enviado', authentication, usuarioData };
    }
    throw new Error('usuario no encontrado');
  } catch (error) {
    console.log(error)
    throw error;
  }
};




const eliminarInvitacion = async ({eliminarInvitacion}) => {
  try {    

    const usuario = await usuarios.findOne({ where: { id: eliminarInvitacion } });

    if (!usuario) {
      throw new Error('El usuario no fue encontrado en la base de datos.');
    }

    await usuario.destroy();

    return { message: 'Invitación cancelada y usuario eliminado', usuario };
 
  } catch (error) {
    console.log(error)
    throw error;
  }
};
module.exports = {
  invateUser,
  eliminarInvitacion
};
