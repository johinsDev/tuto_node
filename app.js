var express = require("express");

var app = express();

app.set('view engine' ,'jade');

app.get('/' , function (request , response) {
   response.render("index" , {pageTitle : 'Hola Desde Jade Con Express'})
});

app.post('/' , function (req , res) {
   res.render('form');
});

app.get('/:name' , function (req , res) {
   res.render('form'  , {'name' : req.params.name});
});
app.listen(8080);