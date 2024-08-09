const { DataTypes } = require('sequelize');

const DetalleCarga = (sequelize) => {
  sequelize.define(
    'detalle_cargas',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
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
      tipoCilindroId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'tipo_cilindros',
          key: 'id',
        },
        allowNull: false,
      },
      estadoCilindroId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'estado_cilindros',
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

module.exports = DetalleCarga;
