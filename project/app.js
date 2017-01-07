var express = require("express");
var bodyParser = require("body-parser");
var User = require('./models/User').User;

var session = require('express-session');
var session_middleware = require("./middlewares/session");
var guest = require("./middlewares/guest");
var router = require("./routes");

var app = express();

app.use("/static" , express.static('public'));
app.use("/static" , express.static('assets'));

app.use(session({
    secret: "JOHINS",
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/app" , session_middleware);
app.use("/app" , router);

app.set('view engine' ,'jade');

app.get('/' , function (request , response) {
    response.render("index")
});

app.use("/sign_in" , guest);
app.get('/sign_in' , function (request , response) {
    response.render("login");
});

app.use("/sign_in" , guest);
app.post('/sign_in' , function (request , response) {
    User.findOne({ email  : request.body.email , password: request.body.password }  , function (err  , user) {
        request.session.user_id = user._id;
        response.redirect("/app/");
    });
});

app.use("/sign_up" , guest);
app.get('/sign_up' , function (request , response) {
    User.find(function (err , doc) {
        response.render("register")
    });
});

app.use("/sign_up" , guest);
app.post('/sign_up' , function (request , response) {
    var user = new User({
        email : request.body.email,
        password : request.body.password,
        password_confirmation: request.body.password_confirmation,
        username: request.body.username
    });
    user.save().then(function () {
        response.send('Guardamos tus datos');
    }, function (err) {
        backURL = request.header('Referer') || '/';
        response.redirect(backURL);
    });
});
app.listen(8080);