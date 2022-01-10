var DataTypes = require("sequelize").DataTypes;
var _autos = require("./autos");
var _comentariosclientes = require("./comentariosclientes");
var _horariosdisponibles = require("./horariosdisponibles");
var _login = require("./login");
var _procesomantenimiento = require("./procesomantenimiento");
var _promociones = require("./promociones");
var _serviciogrua = require("./serviciogrua");
var _serviciomantenimiento = require("./serviciomantenimiento");
var _tipomantenimiento = require("./tipomantenimiento");
var _ubicacion = require("./ubicacion");
var _usuarios = require("./usuarios");

function initModels(sequelize) {
  var autos = _autos(sequelize, DataTypes);
  var comentariosclientes = _comentariosclientes(sequelize, DataTypes);
  var horariosdisponibles = _horariosdisponibles(sequelize, DataTypes);
  var login = _login(sequelize, DataTypes);
  var procesomantenimiento = _procesomantenimiento(sequelize, DataTypes);
  var promociones = _promociones(sequelize, DataTypes);
  var serviciogrua = _serviciogrua(sequelize, DataTypes);
  var serviciomantenimiento = _serviciomantenimiento(sequelize, DataTypes);
  var tipomantenimiento = _tipomantenimiento(sequelize, DataTypes);
  var ubicacion = _ubicacion(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);

  serviciogrua.belongsTo(autos, { as: "id_auto_auto", foreignKey: "id_auto"});
  autos.hasMany(serviciogrua, { as: "serviciogruas", foreignKey: "id_auto"});
  serviciomantenimiento.belongsTo(autos, { as: "id_auto_auto", foreignKey: "id_auto"});
  autos.hasMany(serviciomantenimiento, { as: "serviciomantenimientos", foreignKey: "id_auto"});
  serviciomantenimiento.belongsTo(horariosdisponibles, { as: "id_horario_horariosdisponible", foreignKey: "id_horario"});
  horariosdisponibles.hasMany(serviciomantenimiento, { as: "serviciomantenimientos", foreignKey: "id_horario"});
  usuarios.belongsTo(login, { as: "correo_login", foreignKey: "correo"});
  login.hasOne(usuarios, { as: "usuario", foreignKey: "correo"});
  procesomantenimiento.belongsTo(procesomantenimiento, { as: "id_proceso_anterior_procesomantenimiento", foreignKey: "id_proceso_anterior"});
  procesomantenimiento.hasOne(procesomantenimiento, { as: "procesomantenimiento", foreignKey: "id_proceso_anterior"});
  procesomantenimiento.belongsTo(procesomantenimiento, { as: "id_proceso_siguiente_procesomantenimiento", foreignKey: "id_proceso_siguiente"});
  procesomantenimiento.hasOne(procesomantenimiento, { as: "id_proceso_siguiente_procesomantenimiento", foreignKey: "id_proceso_siguiente"});
  serviciomantenimiento.belongsTo(procesomantenimiento, { as: "id_proceso_inicial_procesomantenimiento", foreignKey: "id_proceso_inicial"});
  procesomantenimiento.hasOne(serviciomantenimiento, { as: "serviciomantenimiento", foreignKey: "id_proceso_inicial"});
  serviciogrua.belongsTo(promociones, { as: "id_promocion_promocione", foreignKey: "id_promocion"});
  promociones.hasMany(serviciogrua, { as: "serviciogruas", foreignKey: "id_promocion"});
  serviciomantenimiento.belongsTo(promociones, { as: "id_promocion_promocione", foreignKey: "id_promocion"});
  promociones.hasMany(serviciomantenimiento, { as: "serviciomantenimientos", foreignKey: "id_promocion"});
  comentariosclientes.belongsTo(serviciogrua, { as: "id_servicio_grua_serviciogrua", foreignKey: "id_servicio_grua"});
  serviciogrua.hasMany(comentariosclientes, { as: "comentariosclientes", foreignKey: "id_servicio_grua"});
  comentariosclientes.belongsTo(serviciomantenimiento, { as: "id_mantenimiento_serviciomantenimiento", foreignKey: "id_mantenimiento"});
  serviciomantenimiento.hasMany(comentariosclientes, { as: "comentariosclientes", foreignKey: "id_mantenimiento"});
  procesomantenimiento.belongsTo(tipomantenimiento, { as: "tipoMantenimiento_tipomantenimiento", foreignKey: "tipoMantenimiento"});
  tipomantenimiento.hasMany(procesomantenimiento, { as: "procesomantenimientos", foreignKey: "tipoMantenimiento"});
  usuarios.belongsTo(ubicacion, { as: "ubicacion_ubicacion", foreignKey: "ubicacion"});
  ubicacion.hasOne(usuarios, { as: "usuario", foreignKey: "ubicacion"});
  autos.belongsTo(usuarios, { as: "propietario_usuario", foreignKey: "propietario"});
  usuarios.hasMany(autos, { as: "autos", foreignKey: "propietario"});
  comentariosclientes.belongsTo(usuarios, { as: "id_cliente_usuario", foreignKey: "id_cliente"});
  usuarios.hasMany(comentariosclientes, { as: "comentariosclientes", foreignKey: "id_cliente"});
  serviciogrua.belongsTo(usuarios, { as: "id_conductor_usuario", foreignKey: "id_conductor"});
  usuarios.hasMany(serviciogrua, { as: "serviciogruas", foreignKey: "id_conductor"});
  serviciomantenimiento.belongsTo(usuarios, { as: "id_mecanico_usuario", foreignKey: "id_mecanico"});
  usuarios.hasMany(serviciomantenimiento, { as: "serviciomantenimientos", foreignKey: "id_mecanico"});

  return {
    autos,
    comentariosclientes,
    horariosdisponibles,
    login,
    procesomantenimiento,
    promociones,
    serviciogrua,
    serviciomantenimiento,
    tipomantenimiento,
    ubicacion,
    usuarios,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
