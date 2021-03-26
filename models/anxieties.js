const mongoose = require('mongoose')
// const {Schema, model} = mongoose;
const Schema = mongoose.Schema

const anxSchema = new Schema ({
  date: {type: Date, required: true},
  trigger: {type: String, required:true},
  triggerType: {type: String, possibleValues: ['situation','thought','physical sensation','event','expectation']},
  intensity: {type: Number, required:true, default: 50},
  thoughts: {type: Array, required:true},

})

const Anx = mongoose.model('Anxiety', anxSchema)

module.exports = Anx
