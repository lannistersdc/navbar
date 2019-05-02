const pool = require('../database/pg_index.js')

const controller = {

  getResults: (req, res) => {
    // assuming the client's query gets passed into the controller via req.body
    var text = 'SELECT location FROM results WHERE location ILIKE $1 LIMIT 15;';
    // let values = [('%' + req.body.queryStr + '%')];
    let values = [('%' + req.query.q + '%')];
    pool.query(text, values)
      .then(data => res.status(200).send(data.rows))
      .catch(() => res.status(404));
  },

  // getAll: (req, res) => {
  //   // do not do this
  //   return pool.query(`SELECT * FROM results;`)
  // },

  addOne: (req, res) => {
    var {restaurantId, restaurantName, restaurantCuisine, location} = req.body;
    pool.query(`INSERT INTO results (restaurantId, restaurantName, restaurantCuisine, location) VALUES (${restaurantId}, ${restaurantName}, ${restaurantCuisine}, ${location})`)
    .catch(error => console.error(error));
  },

  deleteAll: (req, res) => {
    pool.query('DROP DATABASE navbar')
  },

  deleteOne: (req, res) => {
    var { restaurantId } = req.params;
    pool.query(`DELETE FROM results WHERE restaurantId = ${restaurantId}`)
  },

  updateOne: (req, res) => {
    var { restaurantId } = req.params;
    var {restaurantId, restaurantName, restaurantCuisine, location} = req.body;
    pool.query(`INSERT INTO results (restaurantId, restaurantName, restaurantCuisine, location) VALUES (${restaurantId}, ${restaurantName}, ${restaurantCuisine}, ${location})`)
    .catch(error => console.error(error));
  }

}

module.exports = controller;