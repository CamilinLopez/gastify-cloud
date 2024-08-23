const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const Usuario = (sequelize) => {
  const UsuarioModel = sequelize.define(
    'usuarios',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      verificado:{
        type:DataTypes.BOOLEAN,
        defaultValue: false,
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
        allowNull: false,
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


// Método para verificar la contraseña
UsuarioModel.prototype.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Excluir campos sensibles del JSON
UsuarioModel.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.password;
  return values;
};

return UsuarioModel;};

module.exports = Usuario;
