const { DataTypes } = require('sequelize');

const Permisos = (sequelize) => {
  sequelize.define(
    'permisos',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
    },
  );
};

module.exports = Permisos;