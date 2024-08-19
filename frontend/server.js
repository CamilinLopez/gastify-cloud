const { createServer } = require('http'); // Cambiado a 'http' en lugar de 'https'
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, err => {
    if (err) throw err;
    console.log('> Server started on http://localhost:3000'); // Cambiado a 'http' en lugar de 'https'
  });
});





// const { createServer } = require('https');
// const { parse } = require('url');
// const next = require('next');
// const fs = require('fs');
// const path = require('path');

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// // Leer los certificados SSL
// const httpsOptions = {
//   key: fs.readFileSync(path.join(__dirname, 'server.key')),
//   cert: fs.readFileSync(path.join(__dirname, 'server.cert')),
// };

// app.prepare().then(() => {
//   createServer(httpsOptions, (req, res) => {
//     const parsedUrl = parse(req.url, true);
//     handle(req, res, parsedUrl);
//   }).listen(3000, err => {
//     if (err) throw err;
//     console.log('> Server started on https://localhost:3000');
//   });
// });
