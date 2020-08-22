const Task = require('../models/tasks');

exports.getAllTasks = (req,res,next) => {
    Task.fetchAll((tasks)=>{
        return res.status(200).json(tasks);
    });
};
