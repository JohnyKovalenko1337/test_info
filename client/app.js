'use strict';

const readline = require('readline');
const { loginCheck, signup, user_login } = require('./requests/auth');
const { Auth } = require('./cli-queries/auth');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',

});


console.log('                | Welcome to ToDo app |');
let loggined = false;

// ========================== commands for not authorized user ===================================
const commands1 = {
  menu() {
    console.clear();

    console.log('Available commands: ', Object.keys(commands1).join(', '));
  },
  login() {
    let login;
    let password;
    console.clear();

    rl.question(Auth.login,
      (line) => {
        login = line;
        user_login(login)
          .then(user => {
            if (user) {
              rl.question(Auth.password,
                (pass) => {
                  password = pass;
                  if (user.password == password) {
                    console.log(" Authorized !")
                    loggined = true;
                  }
                  else {
                    console.log("Wrong password, repeat operation and input correct password! ")
                  }
                  rl.prompt();
                }
              );
            }
            else {
              console.log("No user with this login found, repeat operation and choose another login")
              rl.prompt();
            }
          })
      });
  },
  signup() {
    let login;
    let password;
    console.clear();

    rl.question(Auth.login,
      (line) => {
        login = line;
        loginCheck(login)
          .then(check => {
            if (check === false) {
              rl.question(Auth.password,
                (pass) => {
                  password = pass;

                  signup(login, password);

                  console.log(" Authorized !")
                  loggined = true;

                  rl.prompt();
                }
              );
            }
            if (check === true) {
              console.log("This login is already used, repeat operation and choose another login")
              rl.prompt();
            }
          });

      })
  }
};


const commands2 = {
  menu() {
    console.log('Available commands: ', Object.keys(commands2).join(', '));
  },
  logout() {
    loggined = false;
    console.log('Now you are logout, type "menu" for available commands');
    rl.prompt();

  }

};

if (loggined) {
  console.log('Available commands: ', Object.keys(commands2).join(', '))
}
else {
  console.log('Available commands: ', Object.keys(commands1).join(', '))
}

rl.prompt();


rl.on('line', line => {
  if (loggined) {
    const command = commands2[line];
    if (command) command();
    else console.log('Unknown command, type "menu" for available commands');
    rl.prompt();
  }
  else {
    const command = commands1[line];
    if (command) command();
    else console.log('Unknown command, type "menu" for available commands');
    rl.prompt();
  }

})
