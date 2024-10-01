const { DataTypes } = require('sequelize');

const UsuarioPermiso = (sequelize) => {
  return sequelize.define('usuario_permiso', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    empresaId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'empresas',
        key: 'id',
      },
    },
    usuarioId: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'usuarios',
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
    },
    rolId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id',
      },
    }
  },{
    timestamps: false,
  });
};

module.exports = UsuarioPermiso;
