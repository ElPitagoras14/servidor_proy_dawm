const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('procesomantenimiento', {
    id_proceso: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha_actual: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    hora_actual: {
      type: DataTypes.TIME,
      allowNull: false
    },
    observacion_mecanico: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    foto: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    tipoMantenimiento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipomantenimiento',
        key: 'id_tipoMantenimiento'
      }
    },
    id_proceso_anterior: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'procesomantenimiento',
        key: 'id_proceso'
      },
      unique: "procesomantenimiento_ibfk_2"
    },
    id_proceso_siguiente: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'procesomantenimiento',
        key: 'id_proceso'
      },
      unique: "procesomantenimiento_ibfk_3"
    }
  }, {
    sequelize,
    tableName: 'procesomantenimiento',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_proceso" },
        ]
      },
      {
        name: "id_proceso",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_proceso" },
        ]
      },
      {
        name: "id_proceso_anterior",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_proceso_anterior" },
        ]
      },
      {
        name: "id_proceso_siguiente",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_proceso_siguiente" },
        ]
      },
      {
        name: "tipoMantenimiento",
        using: "BTREE",
        fields: [
          { name: "tipoMantenimiento" },
        ]
      },
    ]
  });
};
