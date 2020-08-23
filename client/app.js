'use strict';

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

let logging = false;

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
      let login;
      console.clear();
      logging = true;
      rl.question('Enter login', (line)=>{
        login = line;
        console.log(`ur login is ${login}`);
      })
      /* console.log('Enter login');
      rl.prompt()
      rl.on('line', line => {
        

      }); */
    },
    signup() {

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
    rl.on('pause', ()=>{});
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
