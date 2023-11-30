const mongoose = require('mongoose')

const user_details = new mongoose.Schema(
    {
        age: {type:Number, min:0, max:99, required:false},

        weight: {type:
            [{
            weight: {type:Number, min:0, max:1000, required: false},
            timestamp: {type: Date, default: Date.now}
        }],default:[]},

        height: {type:
            [{
            height: {type:Number, min:0, max:1000, required: false},
            timestamp: {type: Date, default: Date.now}
        }],default:[]},

        BMI: {type:
            [{
            BMI: {type:Number, required: false},
            timestamp: {type: Date, default: Date.now}
        }],default:[]},

        createdAt: {type:Date, default: Date.now, immutable: true},
        updatedAt:  {type: Date, default: Date.now},
    },
    {collection: 'user-details'}
)


//hook to calculate BMI
user_details.post('updateOne', async function (doc,next){
    
    try {
        const updatedDoc = await this.model.findOne(this.getQuery());

        console.log(updatedDoc);
        // Calculate BMI based on height and weight
        if (updatedDoc.height && updatedDoc.weight) {
            const heightInMeters = updatedDoc.height / 100; 
            const bmi = parseFloat((updatedDoc.weight / (heightInMeters * heightInMeters)).toFixed(2));


            updatedDoc.BMI = bmi
            updatedDoc.save()
        }

        next();
    } catch (error) {
        next(error);
    }
    

})

module.exports = new mongoose.model('userDetails',user_details)