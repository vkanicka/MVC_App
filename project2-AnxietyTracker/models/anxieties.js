const mongoose = require('mongoose')
const {Schema, model} = mongoose;

const anxSchema = new Anx ({
  date: {type: Date, required: true},
  trigger: {type: String, required:true},
  triggerType: {type: String, possibleValues: ['situation','thought','physical sensation','event','expectation']},
  intensity: {type: Number, required:true, default: 50},
  thoughts: {type: Array, required:true},

})

module.exports = anxSchema
