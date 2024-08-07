const { DataTypes } = require('sequelize');

const Carga = (sequelize) => {
  sequelize.define(
    'cargas',
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
      hora: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      camion_id: {
        type: DataTypes.STRING,
        references: {
          model: 'camiones',
          key: 'id',
        },
        allowNull: false,
      },
      conductor_id: {
        type: DataTypes.STRING,
        references: {
          model: 'conductores',
          key: 'id',
        },
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );
};

module.exports = Carga;
