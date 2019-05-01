const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://admin:myadminpassword@54.153.6.178:3002/navbar', () => console.log('~~~~~~~~~~ NavBar Database Connected ~~~~~~~~~~'))

const navBarSchema = mongoose.Schema ({
  restaurantId: Number,
  restaurantName: String,
  restaurantCuisine: String,
  location: String
})

const Result = mongoose.model('results', navBarSchema)

module.exports = Result;

