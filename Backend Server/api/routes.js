const express = require('express');
const router = express.Router();
const User = require('../models/user.model')

router.use(express.json()   )

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
        res.json({ status:'error:', error:'Email already exists' })
    }

});


module.exports = router;
