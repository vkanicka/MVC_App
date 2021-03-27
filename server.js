// print shorthand function
const p = (x) => {console.log(x)}

// server setup
const express = require('express')
const app = express()
require('dotenv').config()
// Port
const PORT = process.env.PORT

const mongoose = require ('mongoose')
const Anxiety = require('./models/anxieties.js')




//

// Database
const mongodbURI = process.env.MONGODBURI


const db = mongoose.connection

// Connect to Mongo
mongoose.connect(mongodbURI ,  {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => p("Database Connected Successfully", mongodbURI))
.catch(err => p(err))

db.on('error', (err)=>{console.log('ERROR: ', err.message)})
db.on('connected', (err)=>{console.log('mongo connected')})
db.on('disconnected', (err)=>{console.log('mongo disconnected')})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

const methodOverride = require('method-override')
app.use(methodOverride('_method'))


const anxieties = [
  {
    date: '3/25/2021',
    trigger: 'Project deadline',
    triggerType: 'thought',
    intensity: 60,
    thoughts: "What if I don't finish in time?",
  },
  {
    date: '3/24/2021',
    trigger: 'Puppy research',
    triggerType: 'expectation',
    intensity: 100,
    thoughts: "What if all the puppies in Texas get adopted before I can find them? What if I have to wait a year for a puppy?",
  },
  {
    date: '3/23/2021',
    trigger: 'Slept through alarm',
    triggerType: 'event',
    intensity: 25,
    thoughts: "I am going to be too tired my first meeting to be productive and everyone will be mad at me.",
  }
]




// index route
app.get('/anxietytracker', (req,res, next)=>{
  Anxiety.find({}, (error, foundAnxieties) => {
    p(foundAnxieties)
    if(error) {
      p(error);
      next(error)
    } else {
      res.render('index.ejs', {
        tabTitle: 'Home',
        anxieties: foundAnxieties
      })
    }
  })
})

app.post('/anxietytracker/', (req,res)=>{
  Anxiety.create(req.body, (error, createdAnxiety) => {
    if (error) {
      p(error);
      res.send(error)
    } else {
      res.redirect('/anxietytracker');
    }
  })
})

// new route
app.get('/anxietytracker/new', (req,res)=>{
  res.render('new.ejs', {
    tabTitle: 'Add New'
  })
})



// edit route
app.get('/anxietytracker/:id/edit', (req,res)=>{
  Anxiety.findById(req.params.id, (error, foundAnxiety)=>{
    if (error) {
      p(error);
      next(error)
    } else {
      res.render(
        'edit.ejs', {
          anxiety: foundAnxiety,
          tabTitle: 'Edit'
        }
      )
    }
  })
})

app.put('/anxietytracker/:id', (req,res) => {
  Anxiety.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedModel)=>{
    if (error) {
      p(error);
      next(error)
    } else {
      res.redirect('/anxietytracker')
    }
  })
})



// delete route
app.delete('/anxietytracker/:id', (req, res)=>{
  Anxiety.findByIdAndRemove(req.params.id, (error, anxiety) =>{
    if (error) {
      p(error);
      next(error)
    } else {
      res.redirect('/anxietytracker')
    }
  })
})



app.get('/anxietytracker/:id', (req, res)=>{
    Anxiety.findById(req.params.id, (error, foundAnxiety)=>{
      if (error) {
        p(error);
        next(error)
      } else {
        res.render('show.ejs', {
            anxiety:foundAnxiety,
            tabTitle: foundAnxiety.trigger
        });
      }
    });
});


// listen to port
app.listen(PORT,()=>{
  p(`App is listening on port ${PORT}`)
})
