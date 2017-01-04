function render(html_string , parametros) {
    var variables = html_string.match(/[^\{\}]+(?=\})/g);
    var name = '';
    for (var i = variables.length - 1 ; i >= 0 ; i--){
        var value = eval(variables[i]);
        html_string = html_string.replace("{"+  variables[i]+ "}" , parametros[variables[i]] ?  parametros[variables[i]] : value);
    }

    return html_string;
}

module.exports.view = render;