module.exports = function (req, res , next) {
    if (!req.session.user_id){
        res.redirect("/sign_in");
    }else{
        next();
    }
};