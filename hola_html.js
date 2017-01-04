var http = require("http"),
    fs = require("fs");

//var html = fs.readFileSync("./index.html");

fs.readFile('./index.html' , function (err , html) {

    http.createServer( function (request , response) {
        response.writeHead(200 , {
            'Content-type' : 'application/json'
        });
        response.write(JSON.stringify({'Nombre' : 'johan' , 'username' : 'Johins'}));
        response.end();
    }).listen("8080");

});
