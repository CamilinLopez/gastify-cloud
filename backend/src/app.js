const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');

const server = express();
const corsOptions = {
  origin: 'https://gastify-cloud-seven.vercel.app', //'http://localhost:3000', // Tu dominio
  credentials: true, // Habilita el envío de cookies y encabezados de autenticación
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  exposedHeaders: ['Content-Length', 'X-Kuma-Revision'], // Encabezados expuestos
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
};

server.use(cors(corsOptions));
server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/', routes);

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.log(err);
  res.status(status).send(message);
});

module.exports = server;
