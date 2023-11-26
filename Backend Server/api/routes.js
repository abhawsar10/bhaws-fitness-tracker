const express = require('express');
const router = express.Router();
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

router.use(express.json())

router.post('/register', async (req, res) => {

    console.log(req.body)

    try{

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json({ status:'ok' })

    }catch(err){
        res.json({ status:'Error: User Already Exists', error:err })
    }

});

router.post('/login', async (req, res) => {

    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    })

    if(user){

        const token = jwt.sign(
            {
                name: user.name,
                email: user.email,
            },
            'secret123'
        )


        res.json({ status:'ok', user: token })
    }else{
        res.json({ status:'error:', user: false})
    }

});



router.get('/userinfo', async (req, res) => {

    const token = req.headers['x-access-token']

    try{
        const decoded = jwt.verify(token,'secret123')
        const email = decoded.email
        const user = await User.findOne({email: email})

        return res.json({status:'ok',email:user.email})

    }catch(error){
        console.log(error)
        res.json({status:'error', error: 'invalid token'})
    }

});


router.post('/updateuserinfo', async (req, res) => {

    const token = req.headers['x-access-token']

    try{
        const decoded = jwt.verify(token,'secret123')
        const email = decoded.email
        const user = await User.updateOne(
            {email: email},
            {$set: {email: req.body.email}}
        )

        res.json({status:'ok',info:user})

    }catch(error){
        console.log(error)
        res.json({status:'error', error: 'invalid token'})
    }

});



module.exports = router;
