const express = require('express');
// const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./router.js')
const app = express();
const port = process.env.PORT || 3001;

// app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', router);
app.use('/loaderio-ee928719924c519bac3fe807c949a31f', (req, res) => {
  res.status(200).send('loaderio-ee928719924c519bac3fe807c949a31f');
})

app.listen(port, () => {
  console.log(`----- Server running at: http://localhost:${port} -----`);
});

