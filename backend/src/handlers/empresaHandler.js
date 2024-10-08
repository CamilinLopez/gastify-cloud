const passport = require('passport');
const jwt = require('jsonwebtoken');
const { SECRET_KEY, PAGE_URL } = require('../config/env');
const { invateUser, eliminarInvitacion } = require('../controllers/empresasControllers');
const { verifyToken, generateToken } = require('../helpers/generateToken');
const { stockcilindros } = require('../db/index');
const { usuarios, empresas, inventario_bodegas, ventas } = require('../db/index');
const { VentasInicial, inventarioInicial } = require('../utils/cargainicialInventaio');
const cron = require('node-cron');
const bcrypt = require('bcrypt');

let empresaIdGlobal = null;

const crearEmpresa = async (req, res, next) => {
  try {
    passport.authenticate('registrar', { session: false }, async (err, user, info) => {
      if (err) {
        // Imprimir el error si existe
        return res.status(500).json({ message: 'Error interno del servidor' });
      }
      if (!user) {
        // Esto se ejecuta si done(null, false) es llamado
        return res.status(401).json({ message: info.message || 'Unauthorized' });
      }
      // Rescatando los valores de empresa y token
      const { nuevaEmpresa, token } = user;
      const empresas = nuevaEmpresa.dataValues;
      empresaIdGlobal = empresas.id;

      //crear alarmas para cilindros
      await stockcilindros.bulkCreate([
        {
          minStock: 0,
          tipoCilindroId: 1,
          empresaId: empresas.id,
        },
        {
          minStock: 0,
          tipoCilindroId: 2,
          empresaId: empresas.id,
        },
        {
          minStock: 0,
          tipoCilindroId: 3,
          empresaId: empresas.id,
        },
        {
          minStock: 0,
          tipoCilindroId: 4,
          empresaId: empresas.id,
        },
        {
          minStock: 0,
          tipoCilindroId: 5,
          empresaId: empresas.id,
        },
      ]);
      await inventario_bodegas.bulkCreate(inventarioInicial(empresas.id));
      await ventas.bulkCreate(VentasInicial(empresas.id));

      return res.json({
        message: 'Registro exitoso',
        empresas,
        token,
        dashboard: `${PAGE_URL}/dashboard/inicio`,
      });
    })(req, res, next);
  } catch (error) {
    res.status(400).json({ errors: error.message });
  }
};

cron.schedule('0 0 * * *', async (req, res) => {
  try {
    // Lógica para crear información en la base de datos
    await ventas.bulkCreate(VentasInicial(empresaIdGlobal));
    console.log('Datos creados exitosamente.');
  } catch (error) {
    console.error('Error al crear datos:', error);
  }
});

const signinEmpresa = async (req, res, next) => {
  passport.authenticate('signin', async (err, user, info) => {
    try {
      if (err || !user) {
        return res.status(400).json({ errors: info.message });
      }

      req.login(user, { session: false }, async (err) => {
        if (err) return next(err);
        const body = { id: user.empresa.dataValues.id || user.usuario.dataValues.id, empresaId: user.empresa?.empresaId };
        const token = jwt.sign(body, SECRET_KEY);
        // return res.redirect(`${PAGE_URL}/dashboard/inicio`);
        return res.json({
          dashboard: `${PAGE_URL}/dashboard/inicio`,
          token,
          user: user.empresa.dataValues || user.usuario.dataValues,
        });
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

    const data = await invateUser({ rolId, email, empresaId: req.user.id });
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
  const { idInvitacion } = req.params;
  try {
    const data = await eliminarInvitacion({ eliminarInvitacion: idInvitacion });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ errors: error.message });
  }
};

const actualizarDatos = async (req, res, next) => {
  const { idUser } = req.params;
  const { nombre, email, password } = req.body;

  try {
    // Buscar el usuario o empresa por idUser
    let usuarioOempresa =
      (await usuarios.findByPk(idUser, {
        include: ['rol'],
      })) ||
      (await empresas.findByPk(idUser, {
        include: ['rol'],
      }));
    if (!usuarioOempresa) {
      return res.status(404).json({ message: 'Usuario o empresa no encontrado' });
    }

    // Actualizar nombre y email
    usuarioOempresa.nombre = nombre || usuarioOempresa.nombre;
    usuarioOempresa.email = email || usuarioOempresa.email;

    // Si hay una nueva contraseña, hashearla antes de guardarla
    if (password) {
      const salt = await bcrypt.genSalt(10);
      usuarioOempresa.password = await bcrypt.hash(password, salt);
    }

    // Guardar los cambios
    await usuarioOempresa.save();

    res.status(200).json({ message: 'Datos actualizados correctamente', data: usuarioOempresa });
  } catch (error) {
    res.status(400).json({ errors: error.message });
  }
};

module.exports = {
  crearEmpresa,
  signinEmpresa,
  invitarUsuario,
  verificarToken,
  cancelarInvitacion,
  actualizarDatos,
};
