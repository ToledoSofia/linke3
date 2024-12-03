const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const https = require('https'); 
const http = require('http');
const crypto = require('crypto');
const sequelize = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const musicoRoutes = require('./routes/musicoRoutes');
const publicacionRoutes = require('./routes/publicacionRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = crypto.randomBytes(64).toString('hex');

sequelize.authenticate()
    .then(() => console.log('Conectado a la base de datos.'))
    .catch(err => console.error('Error al conectar a la base de datos:', err));

sequelize.sync()
    .then(() => console.log('Modelos sincronizados con la base de datos.'));

app.use('/api/auth', authRoutes);
app.use('/api/musico', musicoRoutes);
app.use('/api/publicaciones', publicacionRoutes);

// const keyPath = path.join(__dirname, './server.key'); 
// const certPath = path.join(__dirname, './server.cert'); 
// const options = {
//     key: fs.readFileSync(keyPath),
//     cert: fs.readFileSync(certPath)
// };

// https.createServer(options, app).listen(3001, () => {
//     console.log('Servidor HTTPS corriendo en https://localhost:3001');
// });

// http.createServer((req, res) => {
//     res.writeHead(301, { "Location": "https://" + req.headers['host'].replace(/:\d+$/, ':3001') + req.url });
//     res.end();
// }).listen(8080, () => {
//     console.log('Servidor HTTP redirigiendo a HTTPS en http://localhost:8080');
// });

module.exports = app;
