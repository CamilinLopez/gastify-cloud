const { DataTypes } = require('sequelize');

const CamionesCamion = (sequelize) => {
  sequelize.define(
    'conductor_camiones',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      conductorId: {
        type: DataTypes.STRING,
        references: {
          model: 'conductores',
          key: 'id',
        },
      },
      camionId: {
        type: DataTypes.STRING,
        references: {
          model: 'camiones',
          key: 'id',
        },
      },
      fecha: {
        type: DataTypes.DATE,
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

module.exports = CamionesCamion;
