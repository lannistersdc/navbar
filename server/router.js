const express = require('express');
const router = express.Router();
const controller = require('./controller.js');

router.route('/navbar')
  .get(controller.getAll)

router.route('/navbar/:restaurantId')
  .get(controller.getOne)

module.exports = router;