const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/navBar', () => console.log('~~~~~~~~~~ NavBar Database Connected ~~~~~~~~~~'))

const navBarSchema = mongoose.Schema ({
  restaurantId: Number,
  restaurantName: String,
  restaurantCuisine: String,
  location: String
})

const Result = mongoose.model('results', navBarSchema)

module.exports = Result;