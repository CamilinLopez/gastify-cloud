const { Router } = require('express');
const passport = require('passport');
const {
  crearEmpresa,
  signinEmpresa,
  invitarUsuario,
  verificarToken,
  cancelarInvitacion,
  actualizarDatos,
} = require('../handlers/empresaHandler');
const { invitarUsuarioValidator } = require('../middleware/empresa/empresaMiddleware');
const { handleValidationErrors } = require('../middleware/manejadorErrores');
const empresaRoutes = Router();

empresaRoutes.post('/registrar', crearEmpresa);

empresaRoutes.post('/verificar-token', verificarToken);

empresaRoutes.post('/signin', signinEmpresa);

empresaRoutes.post(
  '/post-empresa-invitar-usuario',
  passport.authenticate('jwt', { session: false }),
  // [...invitarUsuarioValidator, handleValidationErrors],
  invitarUsuario,
);

empresaRoutes.delete(
  '/post-empresa-cancelar-invitacion/:idInvitacion',
  passport.authenticate('jwt', { session: false }),
  cancelarInvitacion,
);

empresaRoutes.put('/update-user/:idUser', passport.authenticate('jwt', { session: false }), actualizarDatos);

module.exports = empresaRoutes;
