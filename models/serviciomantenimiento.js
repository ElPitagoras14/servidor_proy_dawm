const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('serviciomantenimiento', {
    id_mantenimiento: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_auto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'autos',
        key: 'id_auto'
      }
    },
    id_mecanico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id_usuario'
      }
    },
    tipo_movilizacion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha_pedido: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    precio_total: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true
    },
    id_horario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'horariosdisponibles',
        key: 'id_horario'
      }
    },
    id_proceso_inicial: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'procesomantenimiento',
        key: 'id_proceso'
      },
      unique: "serviciomantenimiento_ibfk_4"
    },
    id_promocion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'promociones',
        key: 'id_promocion'
      }
    }
  }, {
    sequelize,
    tableName: 'serviciomantenimiento',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_mantenimiento" },
        ]
      },
      {
        name: "id_mantenimiento",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_mantenimiento" },
        ]
      },
      {
        name: "id_proceso_inicial",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_proceso_inicial" },
        ]
      },
      {
        name: "id_auto",
        using: "BTREE",
        fields: [
          { name: "id_auto" },
        ]
      },
      {
        name: "id_mecanico",
        using: "BTREE",
        fields: [
          { name: "id_mecanico" },
        ]
      },
      {
        name: "id_horario",
        using: "BTREE",
        fields: [
          { name: "id_horario" },
        ]
      },
      {
        name: "id_promocion",
        using: "BTREE",
        fields: [
          { name: "id_promocion" },
        ]
      },
    ]
  });
};
