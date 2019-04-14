const Result = require('../database/index.js')

const controller = {
  getAll: (req, res) => {
  Result.find()
  .sort( { restaurantId: -1 } )
  .then(results => res.send(results));
  },

  getOne: (req, res) => {
    let { restaurantId } = req.params;
    Result.findOne({ restaurantId })
    .then(results => res.send(results));
  }

}

module.exports = controller;