const { usuarios, empresas, roles } = require('../db/index');
const { generateToken } = require('../helpers/generateToken')
const sendMailerVerificationLink = require('../helpers/sendEmail')
const { SECRET_KEY, WEBS_URL } = require('../config/env')

const invateUser = async (data) => {
  try {    
    
    // verificar si es de una empresa o es un usuario para sacar el id de la empresa
    const empresa = await empresas.findOne({ where: { id: data.empresaId } });

    if (!empresa) {
      throw new Error('La empresa no fue encontrada en la base de datos.');
    }

    const usuario = await usuarios.create(data);    

    const usuarioData = await usuarios.findOne({
      where: { id: usuario.id }, 
      attributes: { exclude: ['rolId', 'password', 'empresaId'] }, 
      include: [
        {
          model: roles,
          as: 'rol',
          attributes:['nombre'], // Select specific fields from roles
        },
      ],
    });

    const { authentication } = generateToken({ id: usuario.id }, SECRET_KEY);
     // Send verification email
    const send = await sendMailerVerificationLink(
       usuario.email,
       WEBS_URL,
       empresa
     );
 
     if (!send) {
       throw new Error('no se pudo enviar el email');
     }
 

     return { message: 'Email enviado',authentication, usuarioData };

  } catch (error) {
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
