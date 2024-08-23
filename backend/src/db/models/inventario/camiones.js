const { DataTypes } = require('sequelize');

const Camiones = (sequelize) => {
  sequelize.define(
    'camiones',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      marca: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      modelo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      placa: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacidad_carga: {
        type: DataTypes.STRING,
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

module.exports = Camiones;
