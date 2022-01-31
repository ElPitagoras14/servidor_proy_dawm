var express = require("express");
var router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

//GET
router.get("/", (req, res, next) => {
  models.usuarios
    .findAll()
    .then(usuarios => {
      res.send(usuarios)
    })
    .catch(err => res.status(400).send(err));
});

router.get("/:nom_rol", (req, res, next) => {
  models.usuarios
    .findAll({ where: { rol: req.params.nom_rol } })
    .then(usuarioSeccion => res.send(usuarioSeccion))
    .catch(err => res.status(400).send(err));
});

router.get("/id/:id",(req,res,next) => {
  let id = req.params.id;
  models.usuarios.findOne({where:{id_usuario:id}})
  .then(usuarioSeccion => res.send(usuarioSeccion))
  .catch(err => res.status(400).send(err));
});

router.post("/token", verifyToken,(req,res,next)=>{
    jwt.verify(req.token,process.env.SECRET,(error,authData)=>{
      if(error){
        res.sendStatus(403);
      }else{
        res.json({
          authData
        })
      }
    })
})

//POST

router.post("/", (req, res, next) => {
  models.usuarios
    .create(req.body)
    .then(response => res.redirect("/"))
    .catch(err => res.status(500).send(err));
});

//PUT
router.put("/", (req, res, next) => {
  models.usuarios
    .update(
      {
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        fecha_nacimiento: req.body.fecha_nacimiento,
        celular: req.body.celular,
        ubicacion: req.body.ubicacion,
        correo: req.body.correo,
      },
      { where: { id_usuario: req.body.idx } }
    )
    .then(response => res.redirect("/"))
    .catch(err => res.status(500).send(err));
});

//DELETE
router.delete("/:id", (req, res, next) => {
  models.usuarios
    .findOne({ where: { id_usuario: req.params.id } })
    .then(usuario => usuario.destroy())
    .catch(err => res.status(400).send(err));
  res.redirect("/");
});


//TOKEN
// authorization: Bearer <token>
function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader != 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    }else{
      res.sendStatus(403);
    }
}
module.exports = router;
