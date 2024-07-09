const { DataTypes } = require("sequelize");

const Prueba = (sequelize) => {
  sequelize.define("pruebas", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

module.exports = Prueba;
