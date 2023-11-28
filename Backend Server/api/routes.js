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

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: SecurePassword,
            userDetails: await UserDetails.create({})
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

    const updateFields = {updatedAt:Date.now()};
    if (req.body.age) {
        updateFields.age = req.body.age;
    }
    if (req.body.height) {
        updateFields.height = req.body.height;
    }
    if (req.body.weight) {
        updateFields.weight = req.body.weight;
    }

    try{
        const decoded = jwt.verify(token,'secret123')
        const user = await User.findOne({email: decoded.email})
        
        await UserDetails.updateOne(
            {_id: user.userDetails},
            {$set: updateFields}
        )

        return res.json({status:'ok'})

    }catch(error){
        console.log(error)
        res.json({status:'error', error: 'invalid token'})
    }

});



module.exports = router;
