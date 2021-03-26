// print shorthand function
const p = (x) => {console.log(x)}

// server setup
const express = require('express')
const app = express()
require('dotenv').config()
// Port
const PORT = process.env.PORT

const mongoose = require ('mongoose')
const AnxSchema = require('./models/anxieties.js')




//

// Database
const mongodbURI = process.env.MONGODBURI


// const db = mongoose.connection

// Connect to Mongo
mongoose.connect(mongodbURI ,  { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => p("Database Connected Successfully", mongodbURI))
.catch(err => p(err))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// const anxieties = [
//   {
//     date: '3/25/2021',
//     trigger: 'Project deadline',
//     triggerType: 'thought',
//     intensity: 60,
//     thoughts: "What if I don't finish in time?",
//   },
//   {
//     date: '3/24/2021',
//     trigger: 'Puppy research',
//     triggerType: 'expectation',
//     intensity: 100,
//     thoughts: "What if all the puppies in Texas get adopted before I can find them? What if I have to wait a year for a puppy?",
//   },
//   {
//     date: '3/23/2021',
//     trigger: 'Slept through alarm',
//     triggerType: 'event',
//     intensity: 25,
//     thoughts: "I am going to be too tired my first meeting to be productive and everyone will be mad at me.",
//   }
// ]
//
// AnxSchema.create(anxieties, (error, anxieties) => {
//   if (error) {
//     p(error)
//   } else {
//     p(anxieties)
//   }
//
// })


// index route
app.get('/anxietytracker', (req,res)=>{
  res.render('index.ejs', {
    anxieties: anxieties,
    tabTitle: 'Home'
  })
})

app.post('/anxietytracker', (req,res)=>{
  // p(req.body)
  let triggerTypes = ['situation','thought','physica sensation','event','expectation']
  triggerTypes.forEach((trigger,index) => {
    if (req.body.triggerType === trigger) {trigger++}
  })

  p(`You selected ${req.body.triggerType}`)


  anxieties.push(req.body)
  res.redirect('/anxietytracker/')
})

// new route
app.get('/anxietytracker/new', (req,res)=>{
  res.render('new.ejs', {
    tabTitle: 'Add New'
  })
})



// edit route
app.get('/anxietytracker/:id/edit', (req,res)=>{
  res.render('edit.ejs', {
    anxiety: anxieties[req.params.id],
    id: req.params.id,
    tabTitle: `Edit`
  })
})

app.put('/anxietytracker/:id', (req,res) => {
  anxieties[req.params.id] = req.body
  res.redirect('/anxietytracker')
})

// show route
app.get('/anxietytracker/:id', (req,res)=>{
  res.render('show.ejs', {
    anxiety: anxieties[req.params.id],
    tabTitle: anxieties[req.params.id].trigger
  })
})

// delete route
app.delete('/anxietytracker/:id', (req, res)=>{
  anxieties.splice(req.params.id, 1)
  res.redirect('/anxietytracker')
})


// listen to port
app.listen(PORT,()=>{
  p(`App is listening on port ${PORT}`)
})
