module.exports = function (req  , res , next) {
    if (req.session.user_id){
            backURL = req.header('Referer') || '/app/';
        res.redirect(backURL);
    }else{
        next();
    }
};
