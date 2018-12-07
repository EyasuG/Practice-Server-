'use strict'
const express = require('express')
const superagent = require('superagent')
const mongoose = require('mongoose')

const { Schema, model}= mongoose //cost thisSchema = mongoose.Schema 

require('dotenv').config()
const mongoURL = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@ds161960.mlab.com:61960/eyasub`
mongoose.connect(mongoURL)
const db = mongoose.connection
db.on('error',console.error.bind(console,'connection errror:'))
db.once('open', ()=> {
console.log('DB connection open!')})

const cors = require('cors') //cross origin resource sharing [Enables us to share data for security purposes]
const PORT = process.env.PORT || 3000
const app = express()
process.env.PORT || 3000
app.use(cors()) //is a middle man 
app.get('/location', (req, res) => {
 const url =
    // `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${process.env.GOOGLE_API_KEY}` // /*static

    `https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.address}&key=${process.env.GOOGLE_API_KEY}`//Dynamic
Location.findOne({ address:req.query.address}, (err,addr) =>{
      if(addr) {
        console.log('address found') 
        res.send(addr)
      }
      else {
      superagent.get(url) // is a third party library that requests data for us with its methods 
        .then(result => {
          const newLocation= new Location({
            address:req.query.address,
          lat:result.body.results[0].geometry.location.lat,
          lng:result.body.results[0].geometry.location.lng
          })
          newLocation.save()
          console.log('created new address')
      res.send(newLocation)
        })
      }
    })
    .catch(err => res.send('Got an error'))
})
app.get('/', (req, res) => {res.send('Listening to port')
})
app.use('*', (req, res) => {
  res.send('<img src="https://http.cat/408"/>')
})
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`)// the server is listening to the request and the response
})
//For the dynamic location listening by the server 
const LocationSchema = new Schema({
 address: String,
lat: Number,
lng: Number 
 })
const Location = model('Location', LocationSchema)
//const silence = new Location({ name: 'Silence' });
//console.log(silence.name); // 'Silence'
