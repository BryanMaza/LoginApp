"use strict";

var mongoose = require("mongoose");

var app = require("./app");

var puerto = process.env.port || 3999;

mongoose.Promise = global.Promise;

mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost:27017/api_rest_auth', { useNewUrlParser: true })
  .then(() => {
    console.log("La conexion a la base de datos correcta");

    app.listen(puerto, () => {
      console.log("El servidor se esta ejecutando en el servidor 3999");
      
    });
  })
  .catch((error) => {
    console.log(error);
  });
