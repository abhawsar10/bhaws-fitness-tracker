const express = require('express')
const cors = require('cors')
const apiRoutes = require('./api/routes');

const app = express()

app.use(cors())
app.use('/api',apiRoutes)


app.get('/hello',(req,res) => {
    res.send("gello world")
})

app.listen('6968',()=>{
    console.log("Backend Server Started on port 6968")
})