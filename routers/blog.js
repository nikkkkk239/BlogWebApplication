const express = require('express')

const router = express.Router();

router.get('/add',(req,res)=>{
    return res.render('addBlog')
})