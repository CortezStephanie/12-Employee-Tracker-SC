const inquirer = require("inquirer");
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
// hides password
// const hideSecrets = require ('hide-secrets');
const {Table} = require('console-table-printer');
// const chalk = require('chalk');
// const logo = require('asciiart-logo');
const app = express();
const PORT = process.env.PORT || 3001;
const util = require('util');
// const { start } = require("repl");
//const { table } = require("console");

// Express middleware
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

// Connect to database
const connection = mysql.createConnection({
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'root123',
    database: 'Employee_Tracker_Dragon_Fly_Inn_db'
  },
  console.log(`Connected to the Employee_Tracker_Dragon_Fly_Inn_db database.`)
);

const query = util.promisify(connection.query).bind(connection);

function consoleTable(rows) {
  const table = new Table();
  table.addRows(rows);
  table.printTable();
};

function answers (){
  inquirer
  .prompt([
     {
      type: 'list',
      message: 'What would you like to do?',
      name: 'Options',
      choices: [
        'view all employees',
        'add employee',
        'update an employee role',
        'view all roles',
        'add a role',
        'add a department',
        'view all departments',
        'quit',
      ],
    }
  ]).then((response) => {
    switch (response.Options) {
      case "view all departments":
        getAllDepartments();
        break;
      case 'view all roles':
        getAllRoles();
        break;
      case "view all employees":
        getAllEmployees();
        break;
      case "add a department":
        addDepartment();
        break;
      case "add a role":
        addRole();
        break;
      case "add employee":
        addEmployee();
        break;
      case "update an employee role":
        updateEmployee();
        break;
        case "quit":
        connection.end();
        break;
      default:
        console.log("something went wrong");

    }
  });
}


async function getAllDepartments() {
  try {
    const rows = await query('SELECT * FROM department;');
    consoleTable(rows);
  } finally {
    answers();
  }
}

async function getAllRoles() {
  try {
    const rows = await query('SELECT r.id, title, salary, d.depName AS department FROM role r JOIN department d ON r.department_id = d.id;');
    consoleTable(rows);
  } finally {
    answers ();
  }
}

async function getAllEmployees() {
  try {
    const rows = await query('SELECT e.id, e.first_name, e.last_name, r.title, d.depName, r.salary, m.last_name AS manager FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id;');
    consoleTable(rows);
  } finally {
    answers();
  }
}


async function addDepartment() {
  inquirer 
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'what is the name of the new department you would like to add?'
      }
    ]).then((response) => {
      addDepartmentQuery(response);
    });
};

async function addDepartmentQuery(res) {
  try {
    await query('INSERT INTO department (depName) VALUES (?);', [res.departmentName]);
    const rows = await query('SELECT * FROM department;');
    consoleTable(rows);
  }finally{
    answers();
  }
}

async function addRole() {
  inquirer 
    .prompt([
      {
        type: 'input',
        name: 'NewRole',
        message: 'what is the name of the new role?'
      },
      {
        type: 'input',
        name: 'RoleSalary',
        message: 'what is the salary of the new role?'
      },
      {
        type: 'input',
        name: 'RoleDepartment',
        message: 'what is the department of the new role?'
      }
    ]).then((response) => {
      addRoleQuery(response);
    });
};

async function addRoleQuery(res) {
  const {NewRole, RoleSalary, RoleDepartment} = res;
  const deptIdArr = await query('SELECT id FROM department WHERE depName=?;', [RoleDepartment]);
  const deptId= deptIdArr[0].id;

  try {
    await query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);', [
      NewRole, 
      RoleSalary, 
      deptId]);
      //shows new table with added role
    const rows = await query('SELECT r.id, title, salary, d.depName AS department FROM role r JOIN department d ON r.department_id = d.id;');
    consoleTable(rows);
  }finally{
    answers();
  }
}

async function addEmployee() {
  inquirer 
    .prompt([
      {
        type: 'input',
        name: 'FirstName',
        message: 'what is the first name of the new employee?'
      },
      {
        type: 'input',
        name: 'LastName',
        message: 'what is the last name of the new employee?'
      },
      {
        type: 'input',
        name: 'EmployeeRole',
        message: 'what is the role of the new employee?'
      },
      {
        type: 'input',
        name: 'EmployeeManager',
        message: 'What is the first name of the Manager for this employee?'
      }
    ]).then((response) => {
      addEmployeeQuery(response);
    });
};

async function addEmployeeQuery(res) {
  const {FirstName, LastName, EmployeeRole, EmployeeManager} = res;
  const roleIdArr = await query('SELECT id FROM role WHERE title=?;', [EmployeeRole]);
  const roleId= roleIdArr[0].id;
  const managerIdArr = await query('SELECT id FROM employee WHERE first_name=?;', [EmployeeManager]);
  const managerId= managerIdArr[0].id;

  try {
    await query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);', [
      FirstName, 
      LastName, 
      roleId,
      managerId]);
      //shows new table with added role
    const rows = await query('SELECT e.id, e.first_name, e.last_name, r.title, d.depName, r.salary, m.last_name AS manager FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id;');
    consoleTable(rows);
  }finally{
    answers();
  }
}

async function updateEmployee() {
  
  inquirer
    .prompt([
      {
        type:'input',
        name: 'chosenEmployee',
        message: 'What is the first name of the employee you would like to update?'
        
      },
      {
        type: 'input',
        name: 'chosenRole',
        message: 'What new role would you like this employee to have?'
      }
    ]).then((response) => {
      updateEmployeeQuery(response);

    });
};

async function updateEmployeeQuery(res) {
  try {

  
  const {chosenEmployee, chosenRole} = res; 
  const roleIdArr = await query('SELECT id FROM role WHERE title=?;', [chosenRole]);
  const roleId= roleIdArr[0].id;
  await query('UPDATE employee SET role_id = ? WHERE first_name = ? ;', [roleId, chosenEmployee]);
  const rows = await query('SELECT e.id, e.first_name, e.last_name, r.title, d.depName, r.salary, m.last_name AS manager FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id;');
    consoleTable(rows);
  }finally{
    answers();
  }
};

answers ();
