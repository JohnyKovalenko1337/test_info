const Task = require('../models/tasks');
const User = require('../models/users');

exports.getAllTasks = (req,res,next) => {
    Task.fetchAll((tasks)=>{
        return res.status(200).json(tasks);
    });
};

exports.createTask = (req,res,next) => {
    const {title, description, creator} = req.body;
    const task = new Task (null, title, description, creator);
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
    const creator = req.body.creator;
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    Task.findByCreator(creator, (tasks)=>{
        const updatedTask = new Task(tasks[id].id, title, description,creator);
        updatedTask.save();
    });
    return res.status(200).json({message:"success"});
};

exports.deleteById = (req,res,next) =>{
    const creator = req.body.creator;
    const id = req.body.id;
    Task.findByCreator(creator, (tasks)=>{
        const deletingTaskId = tasks[id].id;
        Task.deleteById(deletingTaskId, ()=>{});
        return res.status(200).json({message:"success"});

    });
};
