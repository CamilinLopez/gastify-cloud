const { DataTypes } = require('sequelize');

const Usuario = (sequelize) => {
  sequelize.define(
    'usuarios',
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      contraseña: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      empresaId: { // Clave foránea que hace referencia a la tabla de empresas
        type: DataTypes.INTEGER,
        references: {
          model: 'empresas', // Nombre de la tabla de empresas
          key: 'id',
        },
      },
      rolId: { // Relación muchos a uno con Rol
        type: DataTypes.INTEGER,
        allowNull: true,  // Permitir valores nulos
        references: {
          model: 'roles', // Nombre de la tabla de roles
          key: 'id',
        },
      },
    },
    {
      timestamps: false,
    },
  );
};

module.exports = Usuario;


