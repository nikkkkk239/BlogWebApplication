const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'blogs'
    },createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        requied:true,
    }
},{timestamps:true})

const Comment = mongoose.model('comment',commentSchema)

module.exports = Comment;


