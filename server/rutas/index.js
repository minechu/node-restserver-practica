//Modulos externos
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();


//Modulos internos
const Usuario = require('../modelos/archivo');


// Gestionando rutas del servicio
app.get('/usuario', function (req, res) {

  let desde = req.query.desde || 0;
  desde = Number(desde);
  const limite = 5;

  // la funcion exec() es para ejecutar la consulta, el callback permite manejar la respuesta del servidor
  // El objeto como parametro dentro del find permite especificar consiciones para filtrar la busqueda
  // El segundo parametro es un string y permite especificar los campos que se quieren
  Usuario.find({ estado : true }, 'nombre email role estado google img')
    .skip(desde)
    .limit(limite)
    .exec( (err, usuarios) => {
    if(err){
      return res.status(400).json({
        ok: false,
        err
      })
    }

    // El objeto vacio permite realizar un filtrado
    Usuario.countDocuments({ estado : true }, (err, registros) => {

      if(err){
        return res.status(400).json({
          ok: false,
          err
        })
      }

      res.json({
        ok: true,
        registros,
        usuarios
      })
    });
  })
})
  
app.post('/usuario', function (req, res) {
  
  let body = req.body;
  // Instancio mi Schema Usuario y agrego los valores obtenidos en el body 
  // El password es encrptado antes de guardar
  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });

  usuario.save( (err, usuarioDB) =>{
    if(err){
      return res.status(400).json({
        ok: false,
        err
      })
    }

    res.json({
      ok: true,
      usuario: usuarioDB
    })

  });
})

app.put('/usuario/:id', function (req, res) {

  let id = req.params.id;
  let {google, password, ...user} = req.body;

  //Ejemplo con underscore
  let usuario = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'])

  Usuario.findByIdAndUpdate(id, user, { new: true}, (err, usuarioDB) => {

    if(err){
      return res.status(400).json({
        ok: false,
        err
      })
    }

    res.json({
      ok: true,
      usuario: usuarioDB
    })
  })
})

//Borra el usuario fisicamente de la base de datos
app.delete('/usuario/:id', function (req, res) {
  let id = req.params.id;

  //Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

  Usuario.findByIdAndUpdate(id, { estado : false }, { new: true } , (err, usuarioBorrado) => {
    if(err){
      return res.status(400).json({
        ok: false,
        err
      })
    }

    if(!usuarioBorrado){
      return res.status(400).json({
        ok: false,
        err: {
          message: "Usuario no encontrado"
        }
      })
    }

    res.json({
      ok: true,
      usuario: usuarioBorrado
    })

  })
})

module.exports = app;