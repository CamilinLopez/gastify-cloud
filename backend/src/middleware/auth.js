const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { empresas, roles, usuarios } = require('../db/index')
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt
const { SECRET_KEY } = require('../config/env')
const { generateToken } = require('../helpers/generateToken')

passport.use('registrar',new LocalStrategy({
  usernameField: 'email', 
  passwordField: 'password',
}, async(email, password, done)=>{
  try{
    const empresa = await empresas.findOne({where:{email}});

    if(empresa){
      return done(null, false, {message: 'El email ya está registrado'});
    }
    
    const rol = await roles.findOne({where:{nombre:'Administrador'}});
    
    if(!rol){
      throw new Error('Rol de Administrador no encontrado');
    }
    const newEmpresa = await empresas.create({email, password, rolId: rol.id});

    const { authentication } = generateToken({ id: newEmpresa.id }, SECRET_KEY);
    
    return done(null, { empresa: newEmpresa, token: authentication });
  }catch(error){
    done(error);
  }
}))

passport.use('signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},async(email, password, done)=>{

  // Validar el email y la contraseña del usuario en la base de datos.
  try {
    // Buscar en la tabla de empresas
    const empresa = await empresas.findOne({ where: { email } });

    if (empresa) {
      // Verificar la contraseña de la empresa
      const isValid = await empresa.comparePassword(password);
      
      if (!isValid) {
        return done(null, false, { message: 'Credenciales incorrectas' });
      }
      
      return done(null, { type: 'empresa', empresa: empresa });
    }

    // Si no es una empresa, buscar en la tabla de usuarios
    const usuario = await usuarios.findOne({ where: { email } });

    if (usuario) {
      // Verificar la contraseña del usuario
      const isValid = await usuario.comparePassword(password);
      
      if (!isValid) {
        return done(null, false, { message: 'Credenciales incorrectas' });
      }
      
      return done(null, { type: 'usuario', empresa: usuario });
    }

    // Si no se encuentra ni en empresas ni en usuarios
    return done(null, false, { message: 'Credenciales incorrectas' });

  } catch (error) {
    return done(error);
  }

}))

passport.use(new JWTStrategy({
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token'),
},async(token, done)=>{
  try {
    return done(null, token.user);
  } catch (error) {
    done(error)
  }
}));

