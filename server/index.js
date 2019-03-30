const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const Result = require('../database/index.js')
const app = express();
const port = process.env.PORT || 3001;

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/api', (req, res) => {
  let { restaurantName, restaurantCuisine, location } = req.body;
  Result.find({ name: new RegExp('restaurantName', 'i') }, 'restaurantName restaurantCuisine location')
  .then(results => res.send(results));
})

app.listen(port, () => {
  console.log(`----- Server running at: http://localhost:${port} -----`);
});

