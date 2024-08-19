const { DataTypes } = require('sequelize');

const RolesPermisos = (sequelize) => {
  sequelize.define(
    'roles_permisos',
    {
      rolId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'roles', // Nombre de la tabla roles
          key: 'id',
        },
      },
      permisoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'permisos', // Nombre de la tabla permissions
          key: 'id',
        },
      },
    },
    {
      timestamps: false,
    },
  );
};

module.exports = RolesPermisos;

