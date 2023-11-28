const mongoose = require('mongoose')

const user_details = new mongoose.Schema(
    {
        age: {type:Number, min:18, max:99, required:false},
        weight: {type:Number, min:10, max:1000, required: false},
        height: {type:Number, min:10, max:1000, required: false},
        BMI: {type:Number, min:-1, max:100, required: false, default:-1},
        createdAt: {type:Date, default: Date.now, immutable: true},
        updatedAt:  {type: Date, default: Date.now},
    },
    {collection: 'user-details'}
)

user_details.post('updateOne', async function (doc,next){
    
    try {
        const updatedDoc = await this.model.findOne(this.getQuery());

        console.log(updatedDoc);
        // Calculate BMI based on height and weight
        if (updatedDoc.height && updatedDoc.weight) {
            const heightInMeters = updatedDoc.height / 100; 
            const bmi = updatedDoc.weight / (heightInMeters * heightInMeters);

            updatedDoc.BMI = bmi
            updatedDoc.save()
        }

        next();
    } catch (error) {
        next(error);
    }
    

})

module.exports = new mongoose.model('userDetails',user_details)