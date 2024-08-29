const passport = require('passport');
const jwt = require('jsonwebtoken');
const { SECRET_KEY, PAGE_URL } = require('../config/env');
const { invateUser, eliminarInvitacion } = require('../controllers/empresasControllers');
const { verifyToken, generateToken } = require('../helpers/generateToken');

const crearEmpresa = async (req, res, next) => {
  try {
    passport.authenticate('registrar', { session: false }, (err, user, info) => {
      if (err) {
        // Imprimir el error si existe
        return res.status(500).json({ message: 'Error interno del servidor' });
      }
      if (!user) {
        // Esto se ejecuta si done(null, false) es llamado
        return res.status(401).json({ message: info.message || 'Unauthorized' });
      }
      // Rescatando los valores de empresa y token
      const { empresa, token } = user;

      return res.json({
        message: 'Registro exitoso',
        empresa,
        token,
        dashboard: `${PAGE_URL}/dashboard/inicio`,
      });
    })(req, res, next);
  } catch (error) {
    res.status(400).json({ errors: error.message });
  }
};

const signinEmpresa = async (req, res, next) => {
  passport.authenticate('signin', async (err, user, info) => {

    try {
      if (err || !user) {
        return res.status(400).json({ errors: info.message });
      }

      req.login(user, { session: false }, async (err) => {
        if (err) return next(err);
        const body = { id: user.empresa.dataValues.id || user.usuario.dataValues.id };

        const token = jwt.sign(body, SECRET_KEY);

        // return res.redirect(`${PAGE_URL}/dashboard/inicio`);
        return res.json({ dashboard: `${PAGE_URL}/dashboard/inicio`, token, user: user.empresa.dataValues || user.usuario.dataValues });
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ errors: 'Error en el servidor' });
    }
  })(req, res, next);
};

const invitarUsuario = async (req, res, next) => {
  try {
    const { rolId, email } = req.body;
  
    const data = await invateUser({ rolId, email, empresaId:req.user.id });
    res.status(200).json({ message: data.message, usuario: data.usuarioData });
  } catch (error) {
    res.status(400).json({ errors: error.message });
  }
};

const verificarToken = async (req, res, next) => {
  const { token } = req.body;
  let decoded;
  try {
    decoded = verifyToken(token, SECRET_KEY, { ignoreExpiration: true });

    const newToken = generateToken({ id: decoded.id }, SECRET_KEY);

    res.status(200).json({
      token: newToken.authentication,
    });
  } catch (error) {
    res.status(400).json({ errors: error.message });
  }
};


const cancelarInvitacion = async (req, res, next) => {
  const { idInvitacion } = req.params
  try {
    const data = await eliminarInvitacion({eliminarInvitacion:idInvitacion});
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ errors: error.message });
  }
};
module.exports = {
  crearEmpresa,
  signinEmpresa,
  invitarUsuario,
  verificarToken,
  cancelarInvitacion
};
