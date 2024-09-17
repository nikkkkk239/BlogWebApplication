

function hardCheckAuth(){
    return function(req,res,next){
        const user = req?.user;
        if(!user) {
            return res.render('signin')
        }
        return next();
    }
}


module.exports = hardCheckAuth;