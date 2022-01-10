const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('autos', {
    id_auto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    placa: {
      type: DataTypes.CHAR(7),
      allowNull: false
    },
    marca: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    modelo: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    color: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    clave_llave: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    propietario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id_usuario'
      }
    }
  }, {
    sequelize,
    tableName: 'autos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_auto" },
        ]
      },
      {
        name: "id_auto",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_auto" },
        ]
      },
      {
        name: "propietario",
        using: "BTREE",
        fields: [
          { name: "propietario" },
        ]
      },
    ]
  });
};
