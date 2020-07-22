const mysql=require("mysql");
const inquirer=require("inquirer");
const express=require('express');

const connection=mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Kachiga.123!",
    database: "employee_DB"
});

//INIT DB
connection.connect(function(err) {
    if(err) throw err;
    // readTable();
    questions();
});

// function readTable() {
//     connection.query(`SELECT * FROM role`, function(err, res) {
//       if (err) throw err;

//       console.table(res);
//     });
//   }


function questions() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View employees, departments, & Salaries?",
                "Add a new employee?",
                "Add a new department?",
                "Add a new role?",
                "Update existing employee role?",
                "Exit",
            ]
        })
        .then(function(answer) {
            switch(answer.action) {
                case "View employees, departments, & Salaries?":
                    viewEmployee();
                    break;

                case "Add a new employee?":
                    console.log('Add');
                    addEmployee()
                    break;

                case "Add a new department?":
                    console.log('Add');
                    addDepartment()
                    break;

                case "Add a new role?":
                    console.log('Add');
                    addRole();
                    break;

                case "Update existing employee role?":
                    console.log("Update");
                    updateEmpRole();
                    break;
                default:
                    console.log("Thank you!");
                    connection.end();
            };
        })
}


function viewEmployee() {
    let query=connection.query(
        `SELECT employee.id 'EMPLOYEE ID', employee.first_name 'FIRST NAME', employee.last_name 'LAST NAME', department.name 'DEPARTMENT', role.title 'TITLE', role.salary 'SALARY' 
            FROM employee 
            LEFT JOIN role ON employee.id = role.id
            LEFT JOIN department on role.id = department.id;`,
        function(err,res) {
            if(err) throw err;
            console.table(res);
            "\n";
            questions();
        })
};


function addEmployee() {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the employee's first name?",
                // validate: function(answer) {
                //   if (isNaN(answer) === false) {
                //     return true;
                //   }
                //   return false;
                //   }
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the employee's last name?",
                // validate: function(answer) {
                //   if (isNaN(answer) === false) {
                //     return true;
                //   }
                //   return false;
                // }
            }
        ]).then((answer) => {
            let query=connection.query('INSERT INTO employee SET ?',
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: null,
                    manager_id: null
                },
                function(err,res) {
                    if(err) throw err;
                });
            console.log(answer.firstName+" has been added!")
            "\n"

            questions();
        })
};

function addDepartment() {
    inquirer
        .prompt([
            {
                name: "name",
                type: "input",
                message: "What is the new Department's name?",
                // validate: function(answer) {
                //   if (isNaN(answer) === false) {
                //     return true;
                //   }
                //   return false;
                //   }
            },
        ]).then((answer) => {
            let query=connection.query('INSERT INTO department SET ?',
                {
                    name: answer.name,
                },
                function(err,res) {
                    if(err) throw err;
                });
            console.log(answer.name+" has been added to your departments!")
            "\n"

            questions();
        })
};

function addRole() {
    inquirer
        .prompt([
            {
                name: "roleName",
                type: "input",
                message: "What is the title of the new Role?",
                // validate: function(answer) {
                //   if (isNaN(answer) === false) {
                //     return true;
                //   }
                //   return false;
                //   }
            },
            {
                name: "roleSal",
                type: "input",
                message: "What is the salary of the new Role? (100 == 100k)",
                // validate: function(answer) {
                //   if (isNaN(answer) === false) {
                //     return true;
                //   }
                //   return false;
                //   }
            },
        ]).then((answer) => {
            let query=connection.query('INSERT INTO role SET ?',
                {
                    title: answer.roleName,
                    salary: answer.roleSal,
                },
                function(err,res) {
                    if(err) throw err;
                });
            console.log(answer.roleName+" has been added to your roles!")
            "\n"

            questions();
        })
};



function updateEmpRole() {
    let query = connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
    inquirer
        .prompt([
            {
                name: "empSelect",
                type: "list",
                message: "What employee would you like to update?",
                choices: res.map(res => res.id + " " + res.first_name + " " + res.last_name)
                // validate: function(answer) {
                //   if (isNaN(answer) === false) {
                //     return true;
                //   }
                //   return false;
                //   }
            }
        ]).then(employee => {
            let empId = employee.empSelect.split(' ')[0];

            let query = connection.query( "SELECT * FROM role", function(err, res) {
                if (err) throw err;

                inquirer
                .prompt([
                    {
                        name: "empRole",
                        type: "list",
                        message: "What is their new Role?",
                        choices: res.map(res => res.id + " " + res.title)
                        // validate: function(answer) {
                        //   if (isNaN(answer) === false) {
                        //     return true;
                        //   }
                        //   return false;
                        //   }
                    }
                ]).then(empRole => {
                    let roleId = empRole.empRole.split(' ')[0];

                    let query = connection.query("UPDATE employee SET role_id = ? WHERE role_id = ?",
                    [roleId, empId],
                    (err, res) => {
                        if (err) throw err;
                    }
                );
                console.log("We've changed the role!")
                "\n"
    
                questions();
            });
        });
    });
});
};






