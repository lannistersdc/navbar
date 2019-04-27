const express = require('express');
const router = express.Router();
// const controller = require('./controller.js');
const controller = require('./pg_controller.js')

// router.route('/navbar')
//   .get(controller.getAll)

// router.route('/navbar/:restaurantId')
//   .get(controller.getOne)

router.route('/navbar')
  .get(controller.getResults)
  .post(controller.addOne)
  .delete(controller.deleteAll);

router.route('/navbar/:restaurantId')
  // .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

module.exports = router;