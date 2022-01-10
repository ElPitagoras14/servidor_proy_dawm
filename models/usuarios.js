const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuarios', {
    id_usuario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cedula: {
      type: DataTypes.CHAR(10),
      allowNull: false
    },
    nombres: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    apellidos: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    ubicacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ubicacion',
        key: 'id_ubicacion'
      },
      unique: "usuarios_ibfk_1"
    },
    celular: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    foto: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    rol: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    correo: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'login',
        key: 'correo'
      },
      unique: "usuarios_ibfk_2"
    }
  }, {
    sequelize,
    tableName: 'usuarios',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_usuario" },
        ]
      },
      {
        name: "id_usuario",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_usuario" },
        ]
      },
      {
        name: "ubicacion",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ubicacion" },
        ]
      },
      {
        name: "correo",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "correo" },
        ]
      },
    ]
  });
};
