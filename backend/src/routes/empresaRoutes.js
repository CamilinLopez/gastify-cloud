const { Router } = require('express');
const passport = require('passport');
const { crearEmpresa, signinEmpresa, invitarUsuario, verificarToken, cancelarInvitacion } = require('../handlers/empresaHandler')

const empresaRoutes = Router();

empresaRoutes.post('/registrar', crearEmpresa);

empresaRoutes.post('/verificar-token', verificarToken)


empresaRoutes.post('/signin', signinEmpresa)


empresaRoutes.post('/post-empresa-invitar-usuario', passport.authenticate('jwt',{session:false}), invitarUsuario)

empresaRoutes.delete('/post-empresa-cancelar-invitacion/:idInvitacion', passport.authenticate('jwt',{session:false}), 
  cancelarInvitacion)


module.exports = empresaRoutes;
