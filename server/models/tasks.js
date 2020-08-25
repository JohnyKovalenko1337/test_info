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
  constructor(title, description, creator) {
    this.title = title;
    this.description = description;
    this.creator = creator;
  }

  save() {
    getTaskFromFile(tasks => {
      tasks.push(this);
      fs.writeFile(p, JSON.stringify(tasks), err => {
        console.log(err);
      });
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
      tasks.splice(id, 1);
    });
  }

  static updateById(id, body) {
    getTaskFromFile(tasks => {  
        tasks[id].title = title;
    });
  }
};
