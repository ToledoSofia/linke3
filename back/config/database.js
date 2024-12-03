const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('Linkepum', 'alumno', 'alumnoipm', {
//     host: 'localhost',
//     dialect: 'mysql',
// });
const sequelize = new Sequelize('Linkepum', 'root', 'Mysql45822?', {
    host: 'localhost',
    dialect: 'mysql', 
});

sequelize.authenticate()
    .then(() => console.log('Conectado a la base de datos.'))
    .catch(err => console.error('Error al conectar a la base de datos:', err));

module.exports = sequelize;

