const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const passport = require('passport');
require('./middleware/auth');

const server = express();

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Lista de orígenes permitidos
  credentials: true, // Permitir el envío de credenciales (cookies)
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  exposedHeaders: ['Content-Length', 'X-Kuma-Revision'], // Encabezados expuestos
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Métodos HTTP permitidos
};

// Aplicar CORS a todas las rutas
server.use(cors(corsOptions));

server.use(morgan('dev')); // Logger de solicitudes
server.use(express.json()); // Parseo de JSON
server.use(express.urlencoded({ extended: true })); // Parseo de URL-encoded

server.use(passport.initialize()); // Inicializar Passport para autenticación

server.use('/', routes); // Uso de rutas definidas

// Middleware para manejo de errores
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
