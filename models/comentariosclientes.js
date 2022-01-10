const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comentariosclientes', {
    id_comentario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id_usuario'
      }
    },
    id_mantenimiento: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'serviciomantenimiento',
        key: 'id_mantenimiento'
      }
    },
    id_servicio_grua: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'serviciogrua',
        key: 'id_servicio_grua'
      }
    },
    cantidad_estrellas: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(144),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'comentariosclientes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_comentario" },
        ]
      },
      {
        name: "id_comentario",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_comentario" },
        ]
      },
      {
        name: "id_cliente",
        using: "BTREE",
        fields: [
          { name: "id_cliente" },
        ]
      },
      {
        name: "id_mantenimiento",
        using: "BTREE",
        fields: [
          { name: "id_mantenimiento" },
        ]
      },
      {
        name: "id_servicio_grua",
        using: "BTREE",
        fields: [
          { name: "id_servicio_grua" },
        ]
      },
    ]
  });
};
