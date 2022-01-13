const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('promociones', {
    id_promocion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    precio: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'promociones',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_promocion" },
        ]
      },
      {
        name: "id_promocion",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_promocion" },
        ]
      },
    ]
  });
};
