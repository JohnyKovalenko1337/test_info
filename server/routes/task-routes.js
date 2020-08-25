const express = require('express');

const taskController = require('../controllers/task-controller');

const Router = express.Router();

Router.get('/all-tasks', taskController.getAllTasks);
Router.post('/add-task', taskController.createTask);
Router.post('/my-tasks', taskController.getMyTasks);
/* 
Router.post('/updateById' );
Router.delete('/deleteById' ); */

module.exports = Router;