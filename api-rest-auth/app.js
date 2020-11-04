'use strict'
var express=require('express');
var body_parser=require('body-parser');
var file_upload=require('express-fileupload');
var app=express();

//routes
var user_routes=require('./routes/routes');

//middlewards
app.use(body_parser.urlencoded({extended:false}));
app.use(body_parser.json());
app.use(file_upload());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//reescribir las rutas
app.use('/api',user_routes);
//exportar el modulo

module.exports=app;