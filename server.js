'use strict'
const express = require('express')
const cors = require('cors')
const superagent = require('superagent')

require('dotenv').config()
const PORT= process.env.PORT ||3000
const app = express()
process.env.PORT ||3000
app.use(cors())
app.get('/location', (req, res) => {
  const url = 
  // `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${process.env.GOOGLE_API_KEY}` // /*static
  
  `https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.address}&key=${process.env.GOOGLE_API_KEY}` //Dynamic

superagent.get(url)
.then(result=>{
  res.send(new Location(result))
  { lng: result.body.results[0].geometry.location.lng
  lat: result.body.results[0].geometry.location.lat

 }
})
.catch(err=> res.send(err))
})
app.get('/',(req, res)=>res.send('Listening to port'))
app.use('*',(req, res)=>res.send('Something seems wrong'))
app.listen(PORT, ()=>{
console.log(`Listening to port ${PORT}`)// the server is listening to the request and the response
})
//For the dynamic location listening by the server 
 const Location=function(loc){
this.lat= loc.body.results[0].geometry.location.lat 
this.lng=loc.body.results[0].geometry.location.lng
}
