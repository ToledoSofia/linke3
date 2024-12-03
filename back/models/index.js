const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Importar y definir modelos
const Musico = require('./musico');
const Grupos = require('./grupos');
const GruposMusicos = require('./gruposMusicos');

const Instrumento = require('./instrumento');

// Definir asociaciones
Musico.belongsToMany(Grupos, {
    through: GruposMusicos,
    foreignKey: 'Musico_idMusico',
    otherKey: 'Grupos_idGrupos',
});

Grupos.belongsToMany(Musico, {
    through: GruposMusicos,
    foreignKey: 'Grupos_idGrupos',
    otherKey: 'Musico_idMusico',
});

Musico.belongsToMany(Instrumento, {
    through: 'musico_instrumento',
    foreignKey: 'Musico_idMusico',
    otherKey: 'Instrumento_idInstrumento',
});

Instrumento.belongsToMany(Musico, {
    through: 'musico_instrumento',
    foreignKey: 'Instrumento_idInstrumento',
    otherKey: 'Musico_idMusico',
});

// Exportar modelos y Sequelize
module.exports = {
    sequelize,
    Musico,
    Grupos,
    GruposMusicos,
    Instrumento,
};
