const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { empresas, roles, usuarios, usuario_permiso } = require('../db/index')
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt
const { SECRET_KEY } = require('../config/env')
const { generateToken } = require('../helpers/generateToken')

passport.use('registrar', new LocalStrategy({
  usernameField: 'email', 
  passwordField: 'password',
  passReqToCallback: true,
}, async(req, email, password, done) => {
  try {
    const { nombre } = req.body; // Aquí obtienes el campo nombre y tipoEntidad del request
    
    // Verifica si el email ya está registrado en empresas
    const empresa = await empresas.findOne({ where: { email } });

    if (empresa) {
      return done(null, false, { message: 'El email ya está registrado como empresa' });
    }

    // Verifica si el email ya está registrado en usuarios
    const usuario = await usuarios.findOne({ where: { email } });

    if (usuario) {
      return done(null, false, { message: 'El email ya está registrado como usuario' });
    }

    // Obtener el rol de Administrador
    const rolAdmin = await roles.findOne({ where: { nombre: 'Administrador' } });

    if (!rolAdmin) {
      throw new Error('Rol de Administrador no encontrado');
    }

      // Crear empresa
      let nuevaEmpresa = await empresas.create({ nombre, email, password, rolId: rolAdmin.id });

      let permisosAdmin = await rolAdmin.getPermisos();
      
      // Asignar permisos a la empresa
      for (const permiso of permisosAdmin) {
        await usuario_permiso.create({
          empresaId: nuevaEmpresa.id,
          permisoId: permiso.id,
          rolId: rolAdmin.id
        });
    } 

    // Generar token
    const { authentication } = generateToken({ id: nuevaEmpresa.id }, SECRET_KEY);
    
    return done(null, { nuevaEmpresa, token: authentication });
  } catch (error) {
    console.log(error);
    return done(error);
  }
}));


passport.use('signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},async(email, password, done)=>{
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
      if(!usuario.verificado)
        return done(null, false, { message: 'Verifique La Cuenta' });

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
    console.log(error);
    return done(error);
  }

}))

passport.use(new JWTStrategy({
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token del encabezado Authorization
}, async (token, done) => {
  try {
    // Establece el id del usuario en req.user
    return done(null, { id: token.id });

  } catch (error) {
    // En caso de error, pasa el error al done callback
    return done(error);
  }
}));
