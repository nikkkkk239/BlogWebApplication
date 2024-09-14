const express = require("express")
const USER = require("../models/user");
const { verifyUser } = require("../services/authentication");
const router = express.Router();
const path = require('path')
const BLOG = require('../models/blog')
const multer = require('multer')


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.resolve('./public/uploads/'))
    },
    filename:function(req,file,cb){
        const filename = `${Date.now()}-${file.originalname}`
        cb(null,filename)
    }
})
const uploads = multer({storage:storage})



router.get('/',async(req,res)=>{
    const blogs = await BLOG.find({}).sort('createdAt');
    return res.render("home",{
        user : req.user,
        blogs
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
router.get('/addBlog',(req,res)=>{
    console.log(req.user)
    return res.render('addBlog',{
        user:req.user
    })
})
router.post('/addBlog',uploads.single('coverImageUrl'),async(req,res)=>{
    const {title,bodyContent} = req.body;
    const blog = await BLOG.create({
        createdBy : req.user._id,
        title,
        bodyContent,
        coverImageUrl :`uploads/${req?.file?.filename}`
    })
    return res.redirect(`/blog/${blog._id}`)
})
router.get('/blog/:blogId',async(req,res)=>{
    const blogId = req.params.blogId;
    const blog = await BLOG.findOne({_id:blogId})
    return res.render('blog',{
        user:req.user,
        blog
    })
})
module.exports = router