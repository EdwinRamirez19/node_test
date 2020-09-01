const express = require('express')
const bodyParser = require("body-parser");
const mysql = require("mysql");
require('./config/config');
const path = require("path");
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use((req, res, next) => {
    //configurar cabecera
    //para permitir el acceso a nuestra api de todos los dominios
    res.header("Access-Control-Allow-Origin", "*");
    //cabeceras necesarias para AJAX
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");

    //para salir del flujo y seguir
    next();
});
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "uploads")));
app.use(require("./routes/UserController"));
app.use(require("./routes/ProductoController"));
app.use(require("./routes/uploads"))


app.listen(process.env.PORT, () => {
    console.log('escuchando por el puerto 3000')
})