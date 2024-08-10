const { DataTypes } = require('sequelize');

const DescargaCamiones = (sequelize) => {
  sequelize.define(
    'descarga_camiones',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        atuoIncrement: true,
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      hora: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      carga_id: {
        type: DataTypes.STRING,
        references: {
          model: 'cargas',
          key: 'id',
        },
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
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );
};

module.exports = DescargaCamiones;
