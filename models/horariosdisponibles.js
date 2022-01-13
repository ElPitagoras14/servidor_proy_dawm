const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('horariosdisponibles', {
    id_horario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'horariosdisponibles',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_horario" },
        ]
      },
      {
        name: "id_horario",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_horario" },
        ]
      },
    ]
  });
};
