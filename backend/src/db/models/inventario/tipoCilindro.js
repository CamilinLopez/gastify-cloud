const { DataTypes } = require('sequelize');

const TipoCilindro = (sequelize) => {
  sequelize.define(
    'tipo_cilindros',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tipo: {
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

module.exports = TipoCilindro;
