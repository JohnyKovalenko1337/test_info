'use strict';

const readline = require('readline');
const { loginCheck, signup, user_login } = require('./requests/auth');
const { addTask, myTasks, updateMyTask, deleteMyTask } = require('./requests/task');
const { getTasks, updateTask, deleteTask } = require('./requests/admin');
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
  // ========================================= login =======================================
  login() {
    let login;
    let password;
    console.clear();

    rl.question(Auth.login,
      (line) => {
        login = line;     // getting login
        user_login(login)         // geting user by login 
          .then(user => {
            if (user) {
              rl.question(Auth.password,
                (pass) => {
                  password = pass;      // getting password if user exists
                  if (user.password == password) {       // evaluate them
                    console.log(" Authorized !")
                    loggined = true;              // setting loggined
                    currentUser = user;             // saving object of user
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
  // =============================== signup =============================================
  signup() {
    let login;
    let password;
    console.clear();

    rl.question(Auth.login,
      (line) => {
        login = line;           //getting login
        loginCheck(login)           // checking for any equal logins
          .then(check => {
            if (check === false) {
              rl.question(Auth.password,
                (pass) => {
                  password = pass;      //setting password if login is new

                  signup(login, password)   // signing
                    .then(() => {
                      console.log(" Authorized !");

                      loggined = true;

                      user_login(login)     //getting user by login
                        .then(user => {
                          currentUser = user;     // and setting current user
                          rl.prompt();
                        })
                    })


                });
            }
            if (check === true) {
              console.log("This login is already used, repeat operation and choose another login")
              rl.prompt();
            }
          });

      })
  }
};
// =========================== commands for authorized user ======================================
const commands2 = {

  menu() {
    console.clear();
    console.log('Available commands: ', Object.keys(commands2).join(', '));
    rl.prompt();
  },
  // ======================== create task =======================================
  create() {
    let title;
    let description;
    console.clear()
    rl.question(Task.title,
      (line) => {
        rl.prompt();
        title = line;       // getting title
        rl.question(Task.description,
          (line) => {
            rl.prompt();
            description = line;       // getting description
            addTask(title, description, currentUser.username); // saving task
            console.log('Task has been added');
            rl.prompt();
          });
      });
  },
  // =================================== read my tasks ===========================
  mytasks() {
    myTasks(currentUser.username)
      .then(tasks => {
        console.table(tasks);
        rl.prompt();
      })
  },
  //========================= update task ======================================
  update() {
    let id;
    let newTitle;
    let newDescription;
    console.clear();
    myTasks(currentUser.username)     //getting tasks by username
      .then(tasks => {
        console.table(tasks);

        rl.question("input index of your task\n> ", (line) => {
          rl.prompt();

          id = line;        //getting index of my tasks array
          if (tasks[id]) {      // if that index exists
            rl.question("Input new title for your task\n> ", (line) => {
              newTitle = line;      // setting title

              rl.question("Input new description for your task\n> ", (line) => {
                rl.prompt();
                newDescription = line;      //setting description
                updateMyTask(currentUser.username, id, newTitle, newDescription)    // saving task
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
  // ================================ delete task ===================================
  delete() {
    let id;
    console.clear();
    myTasks(currentUser.username)     // getting tasks by username
      .then(tasks => {
        console.table(tasks);

        rl.question("input index of your task\n", (line) => {
          rl.prompt();

          id = line;      //getting index of my tasks array
          if (tasks[id]) {        // if that task exists
            deleteMyTask(currentUser.username, id)      // deleting task
              .then(() => {
                console.log('Task has been deleted');
                rl.prompt();
              })
          }
          else {
            console.log('No task with this index found');
            rl.prompt();
          }
        });
      });
  },
  // =============================== logout ===================================
  logout() {
    loggined = false;
    currentUser = undefined;
    console.log('Now you are logout, type "menu" for available commands');
    rl.prompt();

  }

};

// =========================== commands for admin ======================================
const commands3 = {

  menu() {
    console.clear();
    console.log('Available commands: ', Object.keys(commands3).join(', '));
    rl.prompt();
  },
  // ========================== get all tasks =====================================
  get() {
    getTasks()
      .then((tasks) => {
        console.table(tasks);
        rl.prompt();
      })
  },
  // ===================== creating tasks =================================
  create() {
    commands2.create();
  },
  // ===================== updating tasks =======================================
  update() {
    let id;
    let newTitle;
    let newDescription;
    console.clear();
    getTasks()        //getting all tasks
      .then((tasks) => {
        console.table(tasks);
        rl.question("input index of your task\n> ", (line) => {

          id = line;                    //getting id 
          if (tasks[id]) {                // checking existiong item with this id
            rl.question("Input new title for your task\n> ", (line) => {
              newTitle = line;            // getting title

              rl.question("Input new description for your task\n> ", (line) => {
                newDescription = line;                  // getting description
                updateTask(id, newTitle, newDescription)
                  .then(() => {
                    console.log('Task has been updated');

                    rl.prompt();
                  })
              });
            });
          }
          else {
            console.log('No task with this index found');
            rl.prompt();
          }
        })
      });
  },
  // ============================ deleting tasks ==========================
  delete() {
    let id;
    console.clear();
    getTasks()
      .then(tasks => {
        console.table(tasks);

        rl.question("input index of your task\n>", (line) => {

          id = line;                          // getting id
          if (tasks[id]) {
            deleteTask(id)
              .then(() => {
                console.log('Task has been deleted');
                rl.prompt();
              })
          }
          else {
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
}
// outputting commands, when programm starts
console.log('Available commands: ', Object.keys(commands1).join(', '))

rl.prompt();

// setting different commands, depends on loggined and user.type
rl.on('line', line => {

  if (loggined && currentUser.type === 'user') {
    const command = commands2[line];
    if (command) command();
    else console.log('Unknown command, type "menu" for available commands');
  }

  else if (loggined && currentUser.type === 'admin') {
    const command = commands3[line];
    if (command) command();
    else console.log('Unknown command, type "menu" for available commands');
  }

  else {
    const command = commands1[line];
    if (command) command();
    else console.log('Unknown command, type "menu" for available commands');
    rl.prompt();
  }

})
