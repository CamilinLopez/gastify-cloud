const { DataTypes } = require('sequelize');

const InventarioCamion = (sequelize) => {
  sequelize.define(
    'inventario_camiones',
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
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      camionId: {
        type: DataTypes.STRING,
        references: {
          model: 'camiones',
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
    },
    {
      timestamps: false,
    },
  );
};

module.exports = InventarioCamion;
