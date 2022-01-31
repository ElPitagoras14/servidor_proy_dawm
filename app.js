var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var cookieSession = require("cookie-session")
var logger = require("morgan");

var cors = require("cors");

var indexRouter = require("./routes/index");
var usuariosRouter = require("./routes/usuarios");
var loginRouter = require("./routes/login");
var autosRouter = require("./routes/autos");
var promocionesRouter = require("./routes/promociones");
var servgruaRouter = require("./routes/servicio-grua");
var servmantRouter = require("./routes/servicio-mantenimiento");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
    name:"session",
    keys:['gruasYerovi'],
    maxAge:24 * 60 * 60 * 1000 //24 hours
}))
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/autos", usuariosRouter);
app.use("/login", loginRouter);
app.use("/usuarios", autosRouter);
app.use("/promociones", promocionesRouter);
app.use("/serv_grua", servgruaRouter);
app.use("/serv_mantenimiento", servmantRouter);

module.exports = app;
