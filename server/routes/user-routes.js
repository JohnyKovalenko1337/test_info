const express = require('express');

const userController = require('../controllers/user-controller');

const Router = express.Router();

Router.post('/signup', userController.signup)
Router.post('/login',  userController.userGet);


module.exports = Router;