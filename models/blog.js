const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },bodyContent:{
        type:String,
        required:true,
    },createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users',
    },
    createdAt:{
        type:Number,
        default:Date.now()
    }
    ,coverImageUrl:{
        type:String
    }
},{timestamps:true})

const BLOG = mongoose.model('blogs',blogSchema)

module.exports = BLOG

