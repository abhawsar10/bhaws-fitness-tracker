const express = require('express');
const router = express.Router();

router.use(express.json()   )

router.post('/register', (req, res) => {
    console.log(req.body)
    res.json({ status:'ok' })
});


module.exports = router;
