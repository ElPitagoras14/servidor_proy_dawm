var express = require("express");
const jwt = require('jsonwebtoken');
require('dotenv').config();

var router = express.Router();

const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

//GET
router.get("/", (req, res, next) => {
  models.login
    .findAll()
    .then(cliente => {
      res.send(cliente);
    })
    .catch(err => {
      res.send("Usuario no encontrado");
    });
});
//POST
router.post("/", (req, res, next) => {
  const { email, password } = req.body;
  models.login
    .findAll({
      include: [
        {
          model: models.usuarios,
          as: "usuario",
          where: { correo: email },
        },
      ],
      where: { correo: email, contrasenia: password },
    })
    .then(user => {
      if (user) {
        const accessToken = generateAccessToken(user[0]);
        res.header('authorization',accessToken).json({
          token:accessToken,
          rol:user[0]["usuario"]["rol"]
        })
      } else {
        throw err;
      }
    })
    .catch(err => {
      console.log(err)
      res.send({ Error: "Usuario no encontrado"});
    });
});

//PUT
router.put("/",(req,res,next)=>{
  models.login.create({
    correo:req.body.correo,
    contrasenia:req.body.contrasenia
  }).then(response => res.redirect("/"))
  .catch(err => console.log(err));
})
//DELETE


//TOKEN
function generateAccessToken(user){
  var login = {
    correo:user.correo,
    id:user.usuario.id_usuario,
    tipo:user.usuario.rol
  }
  return jwt.sign(login,process.env.SECRET,{
    expiresIn:60*60*24
  });
}
module.exports = router;
