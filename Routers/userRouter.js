const userController = require('../Controllers/userController');
const express = require('express');

const router = express.Router();

router.route('/adduser').post(userController.upload, userController.adduser);
router.route('/adduser').get(userController.AddUserPage);
router.route('/user/:id').get(userController.selectUser);
router.route('/user/:id').get(userController.selectUser);
router.route('/user/delete/:id').get(userController.deleteUser);
router
    .route('/user/:id')
    .post(userController.upload, userController.updateUser);

module.exports = router;
