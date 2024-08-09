const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { empresas } = require('../db/index')
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
    
    const newEmpresa = await empresas.create({email, password});

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
  try{
    const empresa = await empresas.findOne({where:{email}});
    if(!empresa){
      return done(null, false, {message: 'El email no está registrado'});
    }

    const isValid = await empresa.comparePassword(password);
    
    if(!isValid){
      return done(null, false, {message: 'Contraseña incorrecta'});
    }
    done(null, empresa , {message: 'login success'});
  }catch(error){
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

