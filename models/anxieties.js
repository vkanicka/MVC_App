const mongoose = require('mongoose')
const {Schema, model} = mongoose;
// const Schema = mongoose.Schema

const anxietySchema = new Schema ({
  date: {type: Date, required: true},
  trigger: {type: String, required:true},
  triggerType: {type: String, possibleValues: ['situation','thought','physical sensation','event','expectation']},
  intensity: {type: Number, required:true, default: 50},
  thoughts: {type: Array, required:true},

})

const Anxiety = model('Anxiety', anxietySchema)

module.exports = Anxiety
