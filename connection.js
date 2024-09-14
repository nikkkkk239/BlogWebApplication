const mongoose  = require("mongoose");

function connectDb(address){
    return mongoose.connect(address)
}

module.exports = connectDb ;