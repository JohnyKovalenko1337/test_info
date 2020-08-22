const express = require('express');

const taskController = require('../controllers/task-controller');

const Router = express.Router();

Router.get('/all-tasks', taskController.getAllTasks);
Router.post('/add-task' );
Router.post('/set-task', )
Router.put('/updateById' );
Router.delete('/deleteById' );

module.exports = Router;