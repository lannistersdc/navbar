const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://tony:password@52.53.248.33/navbar', () => console.log('~~~~~~~~~~ NavBar Database Connected ~~~~~~~~~~'))
mongoose.connect('mongodb://tony:pass@54.67.66.252/navbar', () => console.log('~~~~~~~~~~ NavBar Database Connected ~~~~~~~~~~'))


const navBarSchema = mongoose.Schema ({
  restaurantId: Number,
  restaurantName: String,
  restaurantCuisine: String,
  location: { type: [String], index: true }
})

navBarSchema.index({location: "text"});

const Result = mongoose.model('results', navBarSchema);

module.exports = Result;

