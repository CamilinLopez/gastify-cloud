// const { body } = require('express-validator');
// const { empresas } = require('../../db/index');

// const crearEmpresaValidator = [
//   body('email')
//     .trim()
//     .notEmpty().withMessage('El correo electrónico es obligatorio.')
//     .isEmail().withMessage('Debe proporcionar un correo electrónico válido.')
//     .normalizeEmail()
//     .custom(async (email) => {
//       const existingEmail = await empresas.findOne({ where: { email } });
//       if (existingEmail) {
//         throw new Error('El correo electrónico ya está en uso.');
//       }
//     }),
//     body('password')
//     .trim()
//     .notEmpty().withMessage('La contraseña es obligatoria.')
//     .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.')
//     .matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una letra mayúscula.')
//     .matches(/[a-z]/).withMessage('La contraseña debe contener al menos una letra minúscula.')
//     .matches(/\d/).withMessage('La contraseña debe contener al menos un número.')
//     .matches(/[@$!%*?&#]/).withMessage('La contraseña debe contener al menos un carácter especial (@, $, !, %, *, ?, & o #).'),
//   body('fecha_registro')
//     .optional()
//     .isISO8601().withMessage('La fecha de registro debe ser una fecha válida (ISO 8601).')
//     .toDate()
// ];

// module.exports = crearEmpresaValidator; 
