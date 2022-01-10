const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipomantenimiento', {
    id_tipoMantenimiento: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    precio: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tipomantenimiento',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_tipoMantenimiento" },
        ]
      },
      {
        name: "id_tipoMantenimiento",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_tipoMantenimiento" },
        ]
      },
    ]
  });
};
