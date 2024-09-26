const express = require('express')
const bodyparser = require('body-parser')
const app = express()
let port = 5000;
const todoroutes = require('./routes/todoroutes')

app.use(bodyparser.json())
app.use(express.static('public'))

app.get('/' , (req , res) =>{
    res.sendFile((__dirname , 'index.html'))
})


app.use('/' , todoroutes)



app.listen(port , () =>{
    console.log(`this server running ${port}...`)
}) 
