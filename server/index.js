const express = require('express');
// const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./router.js')
const app = express();
const port = process.env.PORT || 3002;

// app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', router);
app.use('/loaderio-106be6d691ff7b4da7b812d6be8a8e98', (req, res) => {
  res.status(200).send('loaderio-106be6d691ff7b4da7b812d6be8a8e98')
})

app.listen(port, () => {
  console.log(`----- Server running at: http://localhost:${port} -----`);
});

