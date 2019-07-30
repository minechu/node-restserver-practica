// Archivo de configuracion inicial
const config = require('./config');

// Conexión mongoose
const {conectar} = require('./conexion-mongoDB');
conectar();

// Modulos externos
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : false}));

// parse aplication json
app.use(bodyParser.json())

// agregando las rutas
app.use(require('./rutas'));

 
app.listen(process.env.PORT, () => {
    console.log("Escuchando en el puerto " + process.env.PORT)
} )