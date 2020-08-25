const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'storage',
  'users.json'
);

const getUserFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.type = 'user';
    this.tasks = [];
  }

  save() {
    getUserFromFile(users => {
      users.push(this);
      fs.writeFile(p, JSON.stringify(users), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getUserFromFile(cb);
  }

  static findByName(username, cb) {
    getUserFromFile((users) => {
      const user = users.find((user) => user.username === username )
      cb(user);
      //return user;


    });
  }

};
