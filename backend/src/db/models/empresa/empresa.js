const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { generateId } = require('../../../utils/generadorId')

// creacion de empresas
const Empresa = (sequelize) => {
  const EmpresaModel = sequelize.define(
    'empresas',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: () => generateId()
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
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 100], // Asegúrate de que la contraseña tenga al menos 8 caracteres
        },
      },
      fecha_registro: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
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
    }
  );

  // Hook para encriptar la contraseña antes de guardar
  EmpresaModel.beforeCreate(async (empresa) => {
    if (empresa.password) {
      const salt = await bcrypt.genSalt(10);
      empresa.password = await bcrypt.hash(empresa.password, salt);
    }
  });

  // Hook para encriptar la contraseña antes de actualizar
  EmpresaModel.beforeUpdate(async (empresa) => {
    if (empresa.changed('password')) {
      const salt = await bcrypt.genSalt(10);
      empresa.password = await bcrypt.hash(empresa.password, salt);
    }
  });

  // Método para verificar la contraseña
  EmpresaModel.prototype.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

  // Excluir campos sensibles del JSON
  EmpresaModel.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;
    return values;
  };

  return EmpresaModel;
};

module.exports = Empresa;
