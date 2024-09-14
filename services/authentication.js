const JWT = require('jsonwebtoken')

const secret = '$d$dkache'

function createUserToken(user){
    const payload = {
        _id:user._id,
        fullName:user.fullName,
        email:user.email,
        profilePhotoUrl:user.profilePhotoUrl
    }
    return JWT.sign(payload,secret)
}

function verifyUser(token){
    const payload = JWT.verify(token,secret)
    return payload;
}

module.exports = {
    verifyUser,
    createUserToken
}