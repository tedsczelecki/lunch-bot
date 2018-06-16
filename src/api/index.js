const express = require('express');
const LunchesRoute = require('./lunches');

const router = express.Router();

router.use('/lunches', LunchesRoute);

module.exports = router;
