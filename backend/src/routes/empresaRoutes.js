const { Router } = require('express');
const passport = require('passport');
const { crearEmpresa, signinEmpresa, invitarUsuario, verificarToken } = require('../handlers/empresaHandler')
const empresaRoutes = Router();

empresaRoutes.post('/registrar', crearEmpresa);

empresaRoutes.post('/verificar-token', verificarToken)


empresaRoutes.post('/signin', signinEmpresa)


empresaRoutes.post('/post-empresa-invitar-usuario', invitarUsuario)



// empresaRoutes.get('/signin', passport.authenticate('jwt',{session:false}) ,(req,res)=>{res.json({ session:'autenticado exitosamente',
//   user: req.user,
//   token:req.query.secret_token
// })})

module.exports = empresaRoutes;
