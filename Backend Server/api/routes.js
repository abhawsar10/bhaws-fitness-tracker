const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

router.use(express.json())

const User = require('../models/user.model')
const UserDetails = require('../models/userdetails.model')


// -----------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------Register-----------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------

router.post('/register', async (req, res) => {

    console.log(req.body)
    const SecurePassword = await bcrypt.hash(req.body.password,10)

    try{

        const userDetails = await UserDetails.create({});

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: SecurePassword,
            userDetails: userDetails._id,
        })


        res.json({ status:'ok' })

    }catch(err){
        res.json({ status:'error', error:err })
    }

});


// -----------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------Login--------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------

router.post('/login', async (req, res) => {

    const user = await User.findOne({
        email: req.body.email,
    })

    if(!user){
        res.json({ status:'error', error:'User Not Found', user: false})
    }

    const isPasswordValid = await bcrypt.compare(req.body.password,user.password)

    if(isPasswordValid){

        const token = jwt.sign(
            {
                name: user.name,
                email: user.email,
            },
            'secret123'
        )

        res.json({ status:'ok', user: token })
    }else{
        res.json({ status:'error', user: false})
    }

});


// -----------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------Get User Info------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------

router.get('/userinfo', async (req, res) => {

    const token = req.headers['x-access-token']

    try{
        const decoded = jwt.verify(token,'secret123')
        const email = decoded.email
        const user = await User.findOne({email: email}).populate('userDetails')

        return res.json({status:'ok',info:user})

    }catch(error){
        console.log(error)
        res.json({status:'error', error: 'invalid token'})
    }

});

// -----------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------Update User Info---------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------

router.post('/updateuserinfo', async (req, res) => {

    const token = req.headers['x-access-token']

    try{
        const decoded = jwt.verify(token,'secret123')
        const user = await User.findOne({email: decoded.email}).populate('userDetails')
        const userdetails = await UserDetails.findOne({_id: user.userDetails})

        //check first if age,weight,height,bmi is passed in the request.(Only if user has new account will these be empty)
        if (req.body.age){  
            userdetails.age = req.body.age;
        }
        if (req.body.weight){
            userdetails.weight.unshift({ weight: req.body.weight, timestamp: Date.now() });         //add new weight to start of array
        }
        if (req.body.height){
            userdetails.height.unshift({ height: req.body.height, timestamp: Date.now() });         //add new height to start of array
        }
        if (userdetails.height.length>0 && userdetails.weight.length>0) {
            const heightInMeters = userdetails.height[0].height / 100; 
            const bmi = parseFloat((userdetails.weight[0].weight / (heightInMeters * heightInMeters)).toFixed(2));

            userdetails.BMI.unshift({ BMI: bmi, timestamp: Date.now() });         //add new bmi to start of array
        }

        userdetails.updatedAt = Date.now()
        userdetails.save()
        // console.log(userdetails)

        return res.json({status:'ok'})

    }catch(error){
        console.log(error)
        res.json({status:'error', error: 'invalid token'})
    }

});



module.exports = router;
