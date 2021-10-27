const inquirer = require("inquirer");
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
// hides password
// const hideSecrets = require ('hide-secrets');
const consoleTable = require('console.table');
// const chalk = require('chalk');
// const logo = require('asciiart-logo');
const app = express();
const PORT = process.env.PORT || 3001;


// Express middleware
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'root123',
    database: 'Employee_Tracker_Dragon_Fly_Inn_db'
  },
  console.log(`Connected to the Employee_Tracker_Dragon_Fly_Inn_db database.`)
);

const questions = [{
  type: 'list',
  message: 'What would you like to do?',
  name: 'Options',
  choices: [
    'View All Employees',
    'Add Employee',
    'Update Employee Role',
    'View All Roles',
    'Add Departments',
    'View All Employees',
    'Quit',
  ]
}]

async function answers() {
  const data = await inquirer.prompt(questions)
  if (data.Options == "View All Employees") {
    const employee = await db.promise().query('SELECT * FROM employee');
    console.log(employee);
    console.table(employee[0]);
    answers();
  }

  // put inquire prompt 
  if (data.Options == "Add Employee") {
    const addEmployee = await db.promise().query('');
    console.log(employee);
    console.table(employee[0]);
    answers();

}

answers();