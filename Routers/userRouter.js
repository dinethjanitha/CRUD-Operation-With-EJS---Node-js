const userController = require('../Controllers/userController');
const express = require('express');

const router = express.Router();

router.route('/').get(userController.serverCheck);

module.exports = router;
