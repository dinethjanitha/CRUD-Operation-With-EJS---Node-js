const HomeController = require('../Controllers/homeController');
const express = require('express');

const router = express.Router();

router.route('/').get(HomeController.Home);

module.exports = router;
