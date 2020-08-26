'use strict';

const readline = require('readline');
const { loginCheck, signup, user_login } = require('./requests/auth');
const { addTask, myTasks, updateMyTask, deleteMyTask } = require('./requests/task');
const { Auth } = require('./cli-queries/auth');
const { Task } = require('./cli-queries/task');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',

});


console.log('                | Welcome to ToDo app |');
let loggined = false;
let currentUser;
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
                    currentUser = login;
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
                  currentUser = login;
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
    console.clear();
    console.log('Available commands: ', Object.keys(commands2).join(', '));
  },
  create() {
    let title;
    let description;
    console.clear()
    rl.question(Task.title,
      (line) => {
        rl.prompt();
        title = line;
        rl.question(Task.description,
          (line) => {
            rl.prompt();
            description = line;
            addTask(title, description, currentUser);
            console.log('Task has been added');
            rl.prompt();
          });
      });
  },
  mytasks() {
    myTasks(currentUser)
      .then(tasks => {
        console.table(tasks);
      })
      .then(() => {
        rl.prompt();
      })
  },
  update() {
    let id;
    let newTitle;
    let newDescription;
    console.clear();
    myTasks(currentUser)
      .then(tasks => {
        console.table(tasks);

        rl.question("input index of your task\n", (line) => {
          rl.prompt();

          id = line;
          if (tasks[id]) {
            rl.question("Input new title for your task\n", (line) => {
              rl.prompt();

              newTitle = line;

              rl.question("Input new description for your task\n", (line) => {
                rl.prompt();
                newDescription = line;
                updateMyTask(currentUser, id, newTitle, newDescription)
                  .then(() => {
                    console.log('Task has been updated');

                    rl.prompt();
                  })

              });
            });
          } else {
            console.log('No task with this index found');
            rl.prompt();
          }
        })

      })
  },
  delete(){
    let id;
    console.clear();
    myTasks(currentUser)
      .then(tasks => {
        console.table(tasks);

        rl.question("input index of your task\n", (line) => {
          rl.prompt();

          id = line;
          if (tasks[id]) {
            deleteMyTask(currentUser, id)
            .then(()=>{
              console.log('Task has been deleted');
              rl.prompt();
            })
          }
          else{
            console.log('No task with this index found');
            rl.prompt();
          }
        });
      });
  },
  logout() {
    loggined = false;
    currentUser = undefined;
    console.log('Now you are logout, type "menu" for available commands');
    rl.prompt();

  }

};


console.log('Available commands: ', Object.keys(commands1).join(', '))


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
