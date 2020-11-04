'use strict'
var jwt=require('jwt-simple');

exports.createToken=((user)=>{
    var payload={
        id:user.id,
        name:user.name,
        bio:user.bio,
        phone:user.phone,
        email:user.email,
    }

    return jwt.encode(payload,'la_clave_de_la_vida_es_disfrutar_de_cada_momento_feliz_199829')
});