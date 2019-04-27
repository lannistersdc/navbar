const Result = require('../database/index.js')

const controller = {
  getAll: (req, res) => {
  Result.find()
  // .sort( { restaurantId: -1 } )
  .then(results => res.send(results));
  },

  getOne: (req, res) => {
    let { restaurantId } = req.params;
    Result.findOne({ restaurantId })
    .then(results => res.send(results));
  },

  addOne: (req, res) => {
    Result.create(req.body)
    .then(() => { res.status(201).send('added a new location'); })
    .catch(error => console.error(error));
  },

  deleteAll: (req, res) => {
    Result.deleteMany({})
    .then(() => res.status(202).send("Database Cleared"))
    .catch((error) => console.error(error));
  },

  deleteOne: (req, res) => {
    let { restaurantId } = req.params;
    Result.findOneAndRemove({ restaurantId })
      .then((data) => res.status(202).send(data))
      .catch((error) => console.error(error));
  },

  updateOne: (req, res) => {
    let { restaurantId } = req.params;
    Result.findOneAndUpdate({ restaurantId }, req.body, { returnNewDocument: true })
    .then((data) => {res.status(200).send(data);})
    .catch((error) => console.error(error));
  }

}

module.exports = controller;