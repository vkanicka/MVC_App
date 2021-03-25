// print shorthand function
const p = (x) => {console.log(x)}

// server setup
const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// const anxieties = require('./models/anxieties.js')

const anxieties = []

// index route
app.get('/anxietytracker', (req,res)=>{
  res.render('index.ejs', {
    anxieties: anxieties,
    tabTitle: 'Home'
  })
})

app.post('/anxietytracker', (req,res)=>{
  p(req.body)
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
