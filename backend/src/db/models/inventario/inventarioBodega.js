const { DataTypes } = require("sequelize");

const InventarioBodega = (sequelize) => {
  sequelize.define("inventario_bodegas", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    tipoCilindroId: {
      type: DataTypes.INTEGER,
      references: {
        model: "tipo_cilindros",
        key: "id",
      },
      allowNull: false,
    },
    estadoCilindroId: {
      type: DataTypes.INTEGER,
      references: {
        model: "estado_cilindros",
        key: "id",
      },
      allowNull: false,
    },
  });
};

module.exports = InventarioBodega;
