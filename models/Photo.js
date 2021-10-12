const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let photo = new Schema({
  URI: {
    type: String,
    ref:'photo'
  },
  Caption : {
      type : String,
      ref:'photo'

  },
  DataAdded: {
      type: Date,
      ref:'photo'
  }
}, {
  collection: 'nemo-led-wall'
})
exports.photoSchema = photo
module.exports = mongoose.model('Photo', photo)
