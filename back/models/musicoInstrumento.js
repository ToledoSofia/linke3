const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MusicoInstrumento = sequelize.define('MusicoInstrumento', {
    Musico_idMusico: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Musico',
            key: 'idMusico',
        },
    },
    Instrumento_idInstrumento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Instrumento',
            key: 'idInstrumento',
        },
    },
}, {
    tableName: 'musico_instrumento',
    timestamps: false,  
});

module.exports = MusicoInstrumento;
