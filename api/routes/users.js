const express = require('express');
const router = express.Router();

const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');
const userController = require('../controllers/users');

router.get('/',checkAuth,userController.getAllAdminUsers);

router.post('/signup',checkAuth,userController.addAdminUser);

router.post('/login',userController.loginAdminUser);

module.exports = router;