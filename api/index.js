const express = require('express')
const app = express()
var db = require("./connectDb");
var parse = require("./parsefile")
var query = require("./queryfile")

db.connectdb();

app.listen(8000, () => {
    console.log('Serveur listening')
})

app.post('/reservation', async function(req,res) { 
    
    parse.insert_data()
    res.send({status: "OK"})
})

app.get('/reservation', async function(req, res) {
    const result = await query.get_list_reservation()
    res.json(result.result[0])
})

app.get('/reservation/:id', async function(req, res) {
    const id = parseInt(req.params.id)
    const reservation = reservation
})