const mongoose = require('mongoose')

const user_details = new mongoose.Schema(
    {
        age: {type:Number, min:18, max:99, required:false},
        weight: {type:Number, min:10, max:1000, required: false},
        height: {type:Number, min:10, max:1000, required: false},
        BMI: {type:Number, min:0, max:100, required: false},
        createdAt: {type:Date, default: Date.now, immutable: true},
        updatedAt:  {type: Date, default: Date.now},
    },
    {collection: 'user-details'}
)


module.exports = new mongoose.model('userDetails',user_details)