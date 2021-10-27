-- join tables here 
-- All Departments
SELECT * FROM department;

-- All Roles
SELECT r.id, title, salary, d.deptName AS department
FROM role r 
JOIN department d 
    ON r.department_id = d.id;

-- All Employee
SELECT e.id, e.first_name, e.last_name, r.title, d.dept_name, r.salary, m.last_name AS manager
FROM employee e 
LEFT JOIN role r ON e.role_id = r.id
LEFT JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id;

-- All Managers
SELECT e.first_name, e.last_name, m.last_name, AS manager
FROM employee e 
JOIN employee m ON e.manager_id = m.id

-- ADD DEPARTMENT 
INSERT INTO department (depName)
VALUES ("add something");

-- ADD ROLE
INSERT INTO roles (title, salary, department_id)
VALUES ('new role title', 120000.00, ?);

-- ADD EMPLOYEE
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("first name", "last name", ?);

-- UPDATE EMPLOYEE updating employee role
UPDATE employee
SET role_id = ?
WHERE first_name = 'whatever user chose';

-- current role title
let rolesArr = query('SELECT title FROM roles;')

[{title: "this"}, {title: "this instead"},]

let newArray = [];
for (let role of rolesArr){
    newArray.push(role.title);
}

inquirer.prompt([
    type:"list", 
    choices: newArray
])