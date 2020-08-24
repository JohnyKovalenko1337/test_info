'use strict';

const readline = require('readline');
const { loginCheck, signup } = require('./requests/auth');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',

});


console.log('                | Welcome to ToDo app |');
const loggined = false;
let commands;


if (!loggined) {
  commands = {
    menu() {
      console.clear();

      console.log('Available commands: ', Object.keys(commands).join(', '));
    },
    login() {



      /* console.log('Enter login');
      rl.prompt()
      rl.on('line', line => {
        

      }); */
    },
    signup() {
      let login;
      let password;
      console.clear();
      rl.stdoutMuted = true;

      rl.question(
        `          ┌────────────────────────────┐
          │ Enter login                │
          └────────────────────────────┘\n        > `,
        (line) => {
          login = line;
          if (!loginCheck(login)) {
            rl.question(
              `          ┌────────────────────────────┐
          │ Enter password             │
          └────────────────────────────┘\n        > `,
              (pass) => {
                password = pass;
                signup(login, password);
                console.log(" Authorized !")
              }
            );
            rl.prompt();

          }

        })
    }

  };

}
else {
  commands = {
    menu() {
      console.log('Available commands: ', Object.keys(commands).join(', '));
    },
    logout() {
      console.log('')
    }

  };
}
console.log('Available commands: ', Object.keys(commands).join(', '))

rl.prompt();


rl.on('line', line => {
  if (line === 'login') {
    const command = commands[line];
    command();
    rl.on('pause', () => { });
  }
  else {
    const command = commands[line];
    if (command) command();
    else console.log('Unknown command, type "menu" for available commands');
    rl.prompt();
  }

}).on('close', () => {
  console.log('Bye!');
  process.exit(0);
});
