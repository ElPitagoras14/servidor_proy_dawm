var express = require("express");
var router = express.Router();

const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

//GET
router.get("/", (req, res, next) => {
  models.serviciomantenimiento
    .findAll({})
    .then(servicios => res.send(servicios))
    .catch(err => res.status(400).send(err));
});

router.get("/conteo", (req, res, next) => {
  models.serviciomantenimiento
    .findAll({
      limit: 6,

      attributes: [
        [sequelize.fn("COUNT", sequelize.col("*")), "num_servicios"],
        [sequelize.fn("YEAR", sequelize.col("fecha_pedido")), "año"],
        [sequelize.fn("MONTH", sequelize.col("fecha_pedido")), "mes"],
      ],
      group: [
        sequelize.fn("YEAR", sequelize.col("fecha_pedido")),
        sequelize.fn("MONTH", sequelize.col("fecha_pedido")),
      ],
      order: [
        [sequelize.fn("YEAR", sequelize.col("fecha_pedido")), "DESC"],
        [sequelize.fn("MONTH", sequelize.col("fecha_pedido")), "DESC"],
      ],
    })
    .then(datos => res.send(datos))
    .catch(err => res.status(400).send(err));
});

//POST
router.post("/", (req, res, next) => {
  models.serviciomantenimiento.create(req.body);
  res.redirect("/");
});

router.get("/conteo/:id",(req,res,next)=>{
  let id = req.params.id;
  models.serviciomantenimiento.findAll({where:{id_mecanico:id}})
  .then(datos => res.send({ cantidad: datos.length}))
})

//PUT

//DELETE

module.exports = router;
