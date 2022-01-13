const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ubicacion', {
    id_ubicacion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    provincia: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    ciudad: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    referencia: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ubicacion',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_ubicacion" },
        ]
      },
      {
        name: "id_ubicacion",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_ubicacion" },
        ]
      },
    ]
  });
};
