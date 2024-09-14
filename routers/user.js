const express = require("express")
const USER = require("../models/user");
const { verifyUser } = require("../services/authentication");
const router = express.Router();

router.get('/',(req,res)=>{
    return res.render("home",{
        user : req.user
    })
})
router.get('/signup',(req,res)=>{
    return res.render('signup')
})
router.get('/signin',(req,res)=>{
    return res.render('signin')
})
router.post('/signup',async(req,res)=>{
   const {FullName,email,password} = req.body;
   console.log(FullName,email,password)
   await USER.create({
        fullName:FullName,
        email,
        password
    })
    return res.redirect('/signin')
})

router.post('/signin',async(req,res)=>{
    const {email,password} = req.body;
    try {
        const token = await USER.matchPassword(email,password);
        return res.cookie('token',token).redirect('/')
    } catch (error) {
        return res.render('signin',{
            errorMessage:error
        })
    }

})
router.get('/logout',(req,res)=>{
    return res.clearCookie('token').redirect('/')
})

module.exports = router