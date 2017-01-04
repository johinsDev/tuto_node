var http = require("http"),
    fs = require("fs")
    parser = require('./params_parse')
    rendered = require('./render_variables');

var p = parser.parse;
var r = rendered.view;

fs.readFile('./index.html' , function (err , html) {

    http.createServer( function (request , response) {

        response.writeHead(200 , {
            'Content-type' : 'text/html'
        });

        var html_string =  html.toString();

        var parametros =  p(request);

        html_string = r(html_string , parametros);
        
        response.write(html_string);
        
        response.end();

    }).listen("8080");

});
