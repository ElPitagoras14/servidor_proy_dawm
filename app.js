var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var cors = require("cors");

var indexRouter = require("./routes/index");
var usuariosRouter = require("./routes/usuarios");
var loginRouter = require("./routes/login");
var autosRouter = require("./routes/autos");
var promocionesRouter = require("./routes/promociones");
var servgruaRouter = require("./routes/servicio-grua");
var servmantRouter = require("./routes/servicio-mantenimiento");
var tipomantenimientoRouter = require("./routes/tipomantenimiento");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/usuarios", usuariosRouter);
app.use("/login", loginRouter);
app.use("/autos", autosRouter);
app.use("/promociones", promocionesRouter);
app.use("/serv_grua", servgruaRouter);
app.use("/serv_mantenimiento", servmantRouter);
app.use("/tipo_mantenimiento", tipomantenimientoRouter);

module.exports = app;
