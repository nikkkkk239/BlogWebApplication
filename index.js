const mongoose = require('mongoose')
const path = require('path')
const express = require('express')
const connectDb  = require('./connection')
const userRouter = require("./routers/user")
const blogRouter = require('./routers/blog')
const cookieParser = require('cookie-parser')
const checkForCookie = require('./middlewares/checkAuth')

connectDb('mongodb://127.0.0.1:27017/meraBlog').then(()=>console.log("Mongodb connected.")).catch(()=>console.log('Mongodb not connected.'))

const app = express();

app.set('view engine','ejs');
app.set('views',path.resolve('./views'))

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static('public'))

app.use(checkForCookie());

app.use('/',userRouter)
app.use('/blog',blogRouter)

app.listen(3000,()=>console.log("Server started at 3000."))
