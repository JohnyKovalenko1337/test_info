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
  constructor(title, description, userId) {
    this.title = title;
    this.description = description;
    this.userId = userId;
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

  static deleteById(id) {
    getTaskFromFile(tasks => {
      tasks.splice(id, 1);
    });
  }

  static updateById(id, body) {
    getTaskFromFile(tasks => {
      if (!tasks[id]) {
        console.log('no task with this id')
      }
      else {
        tasks[id] = body;
      }
    });
  }
};
