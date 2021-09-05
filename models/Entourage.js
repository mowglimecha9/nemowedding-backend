const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let entourage = new Schema({
  Name: {
    type: String
  },
  Vaccinated : {
    type: Boolean
  }
}, {
  collection: 'nemowedding'
})

module.exports = mongoose.model('Entourage', entourage)
