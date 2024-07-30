const { DataTypes } = require('sequelize');

const Roles = (sequelize) => {
  sequelize.define(
    'roles',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );
};

module.exports = Roles;


