const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Grupos = sequelize.define('Grupos', {
    idGrupos: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING(300),
    },
    fecha_creacion: {
        type: DataTypes.DATE,
    },
    promedio_rankin: {
        type: DataTypes.STRING(45),
    },
    ubicacion: {
        type: DataTypes.STRING(100),
    },
    usuario: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    contrasena: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    tableName: 'Grupos',
    timestamps: false,
});


module.exports = Grupos;
