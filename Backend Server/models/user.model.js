const mongoose = require('mongoose')

const User = new mongoose.Schema(
    {
        email: {type:String, required: true, unique:true},
        name: {type:String, required: true},
        password: {type:String, required: true},
        quote: {type:String},
        userDetails: {type:mongoose.Schema.ObjectId, ref:'userDetails'}
    },
    {collection: 'user-data'}
)

module.exports = mongoose.model('userData',User)
