const { DataTypes } = require('sequelize');

const EstadoCilindro = (sequelize) => {
  sequelize.define(
    'estado_cilindros',
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

module.exports = EstadoCilindro;
