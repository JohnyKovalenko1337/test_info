const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'storage',
  'tasks.json'
);

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
      if (this.id) {
        const existingTask = tasks.findIndex(task => task.id === this.id);
        console.log(existingTask);
        const updatedTasks = [...tasks];
        updatedTasks[existingTask] = this;
        fs.writeFile(p, JSON.stringify(updatedTasks), err => {
          console.log(err);
        });
      }
      else {
        this.id = Math.random().toString();
        tasks.push(this);
        fs.writeFile(p, JSON.stringify(tasks), err => {
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
      const creatorTasks = tasks.filter((task) => task.creator === creator)
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
