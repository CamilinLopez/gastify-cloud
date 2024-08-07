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
    },
    {
      timestamps: false,
    },
  );
};

module.exports = Conductores;
