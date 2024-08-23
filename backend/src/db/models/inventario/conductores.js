const { DataTypes } = require('sequelize');

const Conductores = (sequelize) => {
  sequelize.define(
    'conductores',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      licencia: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      hora: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      eliminadoEn: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    },
  );
};

module.exports = Conductores;
