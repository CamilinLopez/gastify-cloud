const { DataTypes } = require('sequelize');

const StockCilindros = (sequelize) => {
  sequelize.define(
    'stockcilindros',
    {
      minStock: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tipoCilindroId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    },
  );
};

module.exports = StockCilindros;
