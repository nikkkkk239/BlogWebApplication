const {verifyUser} = require('../services/authentication')

 function checkForCookie(){
    
    return function (req,res,next){
        
        const cookie = req?.cookies.token;
        if(!cookie){
            return next()
        }

        try {
        const userPayload = verifyUser(cookie)
        console.log(userPayload)
        req.user = userPayload
        } catch (error) {}
        return next();
    }
}

module.exports = checkForCookie