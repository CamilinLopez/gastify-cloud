const { DataTypes } = require('sequelize');

const RolesPermisos = (sequelize) => {
  sequelize.define(
    'roles_permisos',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      rolId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id',
        },
      },
      permisoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'permisos',
          key: 'id',
        },
      }
    },
    {
      timestamps: false,
    }
  );
};

module.exports = RolesPermisos;
