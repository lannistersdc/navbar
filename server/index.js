const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;
const Result = require('../database/index.js')

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/restaurant/:restaurantId', (req, res) => {
  let { restaurantId } = req.params;
  Result.findOne({ restaurantId })
  .then(results => res.send(results));
})

app.listen(port, () => {
  console.log(`----- Server running at: http://localhost:${port} -----`);
});

