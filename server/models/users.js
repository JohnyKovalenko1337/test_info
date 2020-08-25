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
  }

  save() {
    getUserFromFile(users => {
      if (this.username) {
        const existingUser = users.findIndex(use =>  use.username === this.username);
        console.log(existingUser);
        const updatedUsers = [...users];
        updatedUsers[existingUser] = this;
        fs.writeFile(p, JSON.stringify(updatedUsers), err => {
          console.log(err);
        });
      }
      else {
        users.push(this);
        fs.writeFile(p, JSON.stringify(users), err => {
          console.log(err);
        });
      }

    });
  }

  static fetchAll(cb) {
    getUserFromFile(cb);
  }

  static findByName(username, cb) {
    getUserFromFile((users) => {
      const user = users.find((user) => user.username === username)
      cb(user);

    });
  }


};
