// const https = require('https');
// const fs = require('fs');
// const path = require('path');
const server = require('./src/app');
const { database } = require('./src/db/index');
require('dotenv').config();

// Leer los certificados SSL
// const httpsOptions = {
//   key: fs.readFileSync(path.join(__dirname, 'server.key')),
//   cert: fs.readFileSync(path.join(__dirname, 'server.cert')),
// };

const initializeDatabase = async () => {
  try {
    await database.authenticate();
    console.log('Connection to the database has been established successfully.');

    await database.sync({ force: false });
    console.log(`Connected to ${database.getDatabaseName()} database`);

    // Crear el servidor HTTPS
    // https.createServer(httpsOptions, server).listen(3001, () => {
    //   console.log('> Server started on https://localhost:3001');
    // });

    server.listen(3001, () => console.log('listening on port 3001'));


    // server.listen(3001, () => console.log('listening on por 3001'));
  } catch (error) {
    console.log('Unable to connect to the database:', error.message);
  }
};

initializeDatabase();
