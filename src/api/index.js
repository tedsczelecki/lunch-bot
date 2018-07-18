const express = require('express');
const LunchesRoute = require('./lunches');
const RestaurantsRoute = require('./restaurants');

const router = express.Router();

router.use('/lunches', LunchesRoute);
router.use('/restaurants', RestaurantsRoute);

module.exports = router;
