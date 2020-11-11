var validator = require("validator");
var User = require("../models/user");
var bcrypt = require("bcrypt-nodejs");
var jwt_service = require("../services/jwt-auth");
var fs = require("fs");
var path = require("path");


var controller = {
  //Registrar nuevo usuario
  register: function (req, res) {
    var params = req.body;

   
    var validate_email =
      validator.isEmail(params.email) && !validator.isEmpty(params.email);
    var validate_password = !validator.isEmpty(params.password);

    if ( validate_email, validate_password) {
      var user = new User();

      //añadimos los datos del usuario a la base de datos
      try {
        user.name = "";
        user.bio = "";
        user.phone = "";
        user.email = params.email.toLowerCase();
        user.image = "";
      } catch (err) {
        return res.status(400).send({
          status: "400",
          message: "Faltan datos por enviar",
        });
      }

      //Comprobamos que si el usuario existe
      User.findOne({ email: user.email }, (err, issetUser) => {
        if (err) {
          return res.status(400).send({
            status: "400",
            message: "Error al comprobar usuario",
          });
        }
        if (!issetUser) {
          bcrypt.hash(params.password, null, null, (err, hash) => {
            user.password = hash;

            //Guardar usuario
            user.save((err, userSaved) => {
              if (err) {
                return res.status(400).send({
                  status: "400",
                  message: "Error al gurdar el usuario",
                });
              }
              if (!userSaved) {
                return res.status(400).send({
                  status: "400",
                  message: "Error usuario no guardar",
                });
              }

              return res.status(200).send({
                status: "200",
                message: "Usuario guardado",
                user: userSaved,
              });
            });
          });
        } else {
          return res.status(400).send({
            status: "400",
            message: "El usuario ya existe",
          });
        }
      });
    }
  },
  //Loggin del usuario registrado

  login: function (req, res) {
    var params = req.body;

    //Validar datos
    var validate_email =
      validator.isEmail(params.email) &&
      !validator.isEmpty(params.email) &&
      validator;
    var validate_pass = !validator.isEmpty(params.password);

    //Comprobar que no lleguen vacios
    if (validate_email && validate_pass) {
      //Buscar usuario por email
      User.findOne({ email: params.email }, (err, userFind) => {
        if (err) {
          return res.status(400).send({
            status: "400",
            message: "Error al buscar el usuario",
          });
        }
        //Si no se encuentra al usuario
        if (!userFind) {
          return res.status(400).send({
            status: "400",
            message: "El usuario no existe",
          });
        }

        //Descifrar la contraseña para comparar
        bcrypt.compare(params.password, userFind.password, (err, result) => {
          if (result) {
            var data = {
              status: "Ok",
              message: "Datos correctos",
              user:userFind
            };
            //Devuelve el token si envia el parametro(gettoken) a true
            if (params.gettoken) {
              var token = jwt_service.createToken(userFind);
              data.token = token;
            }

            return res.status(200).send({
              data,
            });
          } else {
            return res.status(400).send({
              status: "400",
              message: "El usuario no es correcto",
            });
          }
        });
      });
    } else {
      return res.status(400).send({
        status: "400",
        message: "Error faltan datos",
      });
    }
  },
  // Actulizar datos del ususario
  update: function (req, res) {
    var params = req.body;
    
    // Recogemos los datos
    var validate_name = !validator.isEmpty(params.name);
    var validate_phone = !validator.isEmpty(params.phone);
    var validate_email = validator.isEmail(params.email);
    var validate_password = !validator.isEmpty(params.password);

    // Validamos que no lleguen vacios
    if (
      validate_email &&
      validate_name &&
      validate_phone &&
      validate_password
    ) {
      // Comprobamos que no se repita el email de otro user
      User.findOne({ email: params.email }, (err, userFind) => {
        if (err) {
          return res.status(400).send({
            status: "Error",
            message: "No se pudo realizar la busqueda",
          });
        }
        //Si no existe o es igual a su antiguo email
        if (!userFind || req.user.id === userFind.id) {
          //Encriptamos la contraseña
          bcrypt.hash(params.password, null, null, (err, hash) => {
            //Añadimos los nuevos datos a actualizar
            var update = {
              name: params.name,
              bio: params.bio,
              phone: params.phone,
              email: params.email,
              password: hash,
            };
            // buscamos por el id y actualizamos los datos
            User.findByIdAndUpdate(
              { _id: req.user.id },
              update,
              { new: true },
              (err, userUpdated) => {
                if (err) {
                  return res.status(400).send({
                    status: "Error",
                    message: "Al buscar el usuario",
                  });
                }

                if (!userUpdated) {
                  return res.status(400).send({
                    status: "Error",
                    message: "No se encontro el usuario con ese id",
                  });
                }

                return res.status(200).send({
                  status: "Ok",
                  message: "Los datos se actualizaron correctamente",
                  user: userUpdated,
                });
              }
            );
          });
        } else {
          return res.status(400).send({
            status: "Error",
            message: "El usuario ya existe",
          });
        }
      });
    }
  },
  //Subir foto de perfil del usuario
  upluadImage: function (req, res) {
    var files = req.files;
  //  Comprobamos que llegue la imagen
    if ([null, undefined].indexOf(files) >= 0) {
      return res.status(400).send({
        status: "Error",
        message: "No has enviado ningun archivo",
      });
    } else {

      const file = files.file;
      var user = req.user;
      var params = req.body;
      // Comprobamos si el usuario esta identificado
      if (user.id === params.id) {
        //Validamos la extencion de la imagen
        if (!file.name || file.name.match(/\.(jpg||jpeg ||png||svg||gif||JPEG)$/i)) {
          file.mv(`./uploads/imgs/${file.name}`, (err) => {
            if (err) {
              res.status(400).send({
                status: "Error",
                message: "Error al subir la imagen",
              });
            }

            // Añadimos la imagen a la base de datos

            User.findByIdAndUpdate(
              { _id: user.id },
              { image: file.name },
              (err, userUpdated) => {
                if (err) {
                  return res.status(400).send({
                    status: "Error",
                    message: "No se pudo actualizar el usuario",
                  });
                }
                if (!userUpdated) {
                  return res.status(400).send({
                    status: "Error",
                    message: "No se pudo actualizar la información",
                  });
                }
                return res.status(200).send({
                  status: "Ok",
                  message: "File upload",
                });
              }
            );
          });
        } else {
          return res.status(400).send({
            status: "Error",
            message: file.name + " No es una imagen",
          });
        }
      } else {
        return res.status(400).send({
          status: "Error",
          message: "No puedes actualizar este usuario",
        });
      }
    }
  },
  //Obtener foto de perfil del usuario
  getImagen: function (req, res) {
    var file_name = req.params.filename;
  //  Validamos que llegue el nombre de la imagen
    if (file_name != null) {
      var path_file = `./uploads/imgs/${file_name}`;
      // Si la direccion existe se guardara en el servidor
      if (fs.existsSync(path_file)) {
        return res.sendFile(path.resolve(path_file));
      } else {
        
        return res.status(500).send({
          status: "Error",
          message: "La imagen no  existe",
        });
      }
    }else{
      return res.status(500).send({
        status: "Error",
        message: "No hay referencia a la imagen"
    });
    }
  },
};

module.exports = controller;
