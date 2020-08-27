const fs = require('fs');
const path = require('path');

// path for tasks storage
const p = path.join(        
  path.dirname(process.mainModule.filename),
  'storage',
  'tasks.json'
);

// function for getting from file tasks
const getTaskFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Task {
  constructor(id, title, description, creator) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.creator = creator;
  }

  save() {
    getTaskFromFile(tasks => {
      if (this.id) {              // if we get existing id
        const existingTask = tasks.findIndex(task => task.id === this.id);    //finding index of this task
        const updatedTasks = [...tasks];  // creating new array with all previous elements;
        updatedTasks[existingTask] = this;  // setting new saving task to this index
        fs.writeFile(p, JSON.stringify(updatedTasks), err => {  //writing to file updated tasks
          console.log(err);
        });
      }
      else {
        this.id = Math.random().toString(); // creating id for task
        tasks.push(this);     // pushes to array
        fs.writeFile(p, JSON.stringify(tasks), err => {   // and writting to array
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getTaskFromFile(cb);
  }

  static findByCreator(creator, cb) {
    getTaskFromFile((tasks) => {
      const creatorTasks = tasks.filter((task) => task.creator === creator) //filtering tasks array by creator
      cb(creatorTasks);

    });
  }

  static deleteById(id) {
    getTaskFromFile(tasks => {
      const newTasks= tasks.filter(task => task.id !== id);
      fs.writeFile(p, JSON.stringify(newTasks), err => {
        console.log(err);
      });
    });
  }

};
