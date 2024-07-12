const { DataTypes } = require("sequelize");

const EstadoCilindro = (sequelize) => {
  sequelize.define("estado_cilindros", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
};

module.exports = EstadoCilindro;
