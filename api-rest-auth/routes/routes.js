'use strict'
var express=require('express');

//controller
var userController=require('../controllers/user');
const user = require('../models/user');

//middleware para comprobar si existe el token
const auth_middleware=require('../middleware/authentication');
var router=express.Router();

router.post('/register',userController.register);
router.post('/login',userController.login);
router.put('/update',auth_middleware.validarToken,userController.update);
router.put('/avatar',auth_middleware.validarToken,userController.upluadImage);
router.get('/avatar/:filename',userController.getImagen)
module.exports=router;