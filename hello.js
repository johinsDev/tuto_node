var http = require("http");

var manager = function (request , response) {
    console.log("Hola mundo");
    response.end("Hola Mundo");
};
    
var server = http.createServer(manager);

server.listen("8080");