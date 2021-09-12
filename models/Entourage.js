const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let entourage = new Schema({
  Name: {
    type: String
  },
  Vaccinated : {
    type: String
  },
  Attending : {
    type: Boolean
  },
  Message: {
    type : String
  },
  Phone: {
    type : String
  }
}, {
  collection: 'nemowedding'
})

module.exports = mongoose.model('Entourage', entourage)
