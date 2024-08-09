const { usuarios, empresas, roles } = require('../db/index');
const { generateToken, verifyToken } = require('../helpers/generateToken')
const sendMailerVerificationLink = require('../helpers/sendEmail')
const { SECRET_KEY, WEBS_URL } = require('../config/env')

const invateUser = async (data) => {
  try {    
    
     const empresaData = verifyToken(data.empresa, SECRET_KEY);
    
    if (!empresaData) {
      throw new Error('Token de empresa inválido o expirado.');
    }

    const empresa = await empresas.findOne({ where: { id: empresaData.id } });

    if (!empresa) {
      throw new Error('La empresa no fue encontrada en la base de datos.');
    }


    data = {...data, empresaId:empresaData.id }
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

module.exports = {
  invateUser
};
