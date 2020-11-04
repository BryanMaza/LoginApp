'use strict'
var jwt = require("jwt-simple");
var clave = "la_clave_de_la_vida_es_disfrutar_de_cada_momento_feliz_199829";

exports.validarToken = function (req, res,next) {
  var token = req.headers.authorization;
  if (token === null || token === undefined || token === "") {
    return res.status(500).send({
      status: "Error",
      message: "No se ha enviado el token",
    });
  } 
    //limpiar el token y quitar comillas
    var token = token.replace(/['"]+/g, "");

    try{
        var token_decoded=jwt.decode(token,clave);


    }catch(ex){
        return res.status(500).send({
            status: "Error",
            message: "El token no es valido",
          });
    }
    req.user=token_decoded;
    next();
    
  
};
