const Task = require('../models/tasks');
const User = require('../models/users');

exports.getAllTasks = (req,res,next) => {
    Task.fetchAll((tasks)=>{
        return res.status(200).json(tasks);
    });
};

exports.createTask = (req,res,next) => {
    const {title, description, creator} = req.body;
    const task = new Task (title, description, creator);
    task.save();
    return res.status(200).json({ message: "success" });
};

exports.getMyTasks = (req,res,next) => {
    const creator = req.body.creator;
    Task.findByCreator(creator, (tasks)=>{
        console.log(tasks);
        return res.json({tasks: tasks});
    })
}

exports.updateById = (req,res,next) =>{

};

exports.deleteById = (req,res,next) =>{

};
