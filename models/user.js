const mongoose = require("mongoose")
const {createHmac,randomBytes} = require("crypto");
const {createUserToken} = require('../services/authentication')

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },email:{
        type:String,
        required:true,
        unique:true
    },salt:{
        type:String,
        unique:true
    },password:{
        type:String,
        required:true
    },profilePhotoUrl:{
        type:String,
        default:"profilePic/default.avif",
    },role:{
        type:String,
        default:"USER",
        enum:["USER","ADMIN"]
    }
},{timestamps:true})

userSchema.pre('save',function(next){
    const user = this ;

    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256',salt)
        .update(user.password)
        .digest('hex');
    this.salt = salt;
    this.password = hashedPassword;
    next();
})

userSchema.static('matchPassword',async function(email,password){
    const user = await this.findOne({email});
    if(!user) throw new Error("user not found .")
    console.log('user',user);
    
    const salt = user.salt;
    const hashedPassword = user.password;

    const providedHashedPassword = createHmac('sha256',salt)
        .update(password)
        .digest('hex')
    console.log('provided hashed password',providedHashedPassword)
    console.log('Previous hashed password.',hashedPassword)
    if(providedHashedPassword != hashedPassword) {
        throw new Error("Incorrect password .")

    }
    const token =createUserToken(user);
    console.log(token,'token hai ye ')
    return token;
})

const USER = mongoose.model("users",userSchema)

module.exports = USER;