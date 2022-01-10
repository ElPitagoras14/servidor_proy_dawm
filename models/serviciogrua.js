const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('serviciogrua', {
    id_servicio_grua: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_conductor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id_usuario'
      }
    },
    id_auto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'autos',
        key: 'id_auto'
      }
    },
    ubicacion_latitud: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    ubicacion_longitud: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    ubicacion_referencia: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    hora_inicio: {
      type: DataTypes.TIME,
      allowNull: false
    },
    hora_final: {
      type: DataTypes.TIME,
      allowNull: false
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
    tableName: 'serviciogrua',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_servicio_grua" },
        ]
      },
      {
        name: "id_servicio_grua",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_servicio_grua" },
        ]
      },
      {
        name: "id_conductor",
        using: "BTREE",
        fields: [
          { name: "id_conductor" },
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
        name: "id_promocion",
        using: "BTREE",
        fields: [
          { name: "id_promocion" },
        ]
      },
    ]
  });
};
