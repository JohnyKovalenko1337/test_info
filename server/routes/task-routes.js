const express = require('express');

const taskController = require('../controllers/task-controller');

const Router = express.Router();

Router.get('/all-tasks', taskController.getAllTasks);
Router.post('/add-task', taskController.createTask);
Router.post('/my-tasks', taskController.getMyTasks);
Router.post('/updateById', taskController.updateById);
Router.post('/deleteById', taskController.deleteById );

Router.post('/admin/updateTask', taskController.updateAdminTask);
Router.post('/admin/deleteTask', taskController.deleteAdminTask)


module.exports = Router;