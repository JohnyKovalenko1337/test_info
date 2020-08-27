const fs = require('fs');
const path = require('path');

// path of users storage
const p = path.join(
  path.dirname(process.mainModule.filename),
  'storage',
  'users.json'
);

// function of reading users from file
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
    this.type = 'user';     // default type user
  }

  save() {
    getUserFromFile(users => {
        users.push(this);   // getting array and pushes new user 
        fs.writeFile(p, JSON.stringify(users), err => { // writing to file array
          console.log(err);
        });
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
