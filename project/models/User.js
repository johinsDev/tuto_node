var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/fotos");

var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ , "Coloca un email valido"];

var user_schema = new Schema({
    name:String,
    username:{type:String , required:"El username es obligatorio" , maxlength:[50, "Username muy grande"]},
    password:{type:String , minlength:[5,"La contraseña es muy corta"], validate:{
        validator: function (p) {
            return this.password_confirmation == p;
        },
        message: "Las contraseñas no son iguales"
    }},
    email:{type : String , required: "El correo es obligatorio" , match:email_match},
    age:{type: Number, mim:[18 , "Debes  ser mayor de edad"]},
    date_of_birth:Date,
    sex: { type:String , enum:{values:['M' , 'F'] , message:"opcion no valida" } }
});

user_schema.virtual("password_confirmation").get(function () {
    return this.p_c;
}).set(function (password) {
    return this.p_c = password;
});
var User = mongoose.model('User' , user_schema);

module.exports.User = User;
