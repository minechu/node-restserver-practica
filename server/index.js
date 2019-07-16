// Archivo de configuracion inicial
const config = require('./config');

// Modulos externos
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : false}));

// parse aplication json
app.use(bodyParser.json())

app.get('/usuario', function (req, res) {
  res.json('get Usuario')
})

app.post('/usuario', function (req, res) {

    let body = req.body;

    res.json({
        persona : body
    })
  })

app.put('/usuario', function (req, res) {
    res.json('put Usuario')
})

app.delete('/usuario', function (req, res) {
    res.json('delete usuario')
  })
 
app.listen(process.env.PORT, () => {
    console.log("Escuchando en el puerto " + process.env.PORT)
} )