const { body } = require('express-validator');
const { usuarios } = require('../../db/index');

const invitarUsuarioValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('El correo electrónico es obligatorio.')
    .isEmail().withMessage('Debe proporcionar un correo electrónico válido.')
    .normalizeEmail()
    .custom(async (email, { req }) => {
      const existingUser = await usuarios.findOne({
        where: {
          email: email,
          empresaId: req.user.id,
          activo: true, 
        },
      });
      if (existingUser) {
        throw new Error('El usuario ya existe');
      }
    }),
];

module.exports = {invitarUsuarioValidator};
