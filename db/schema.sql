DROP DATABASE IF EXISTS Employee_Tracker_Dragon_Fly_Inn_db;
CREATE DATABASE Employee_Tracker_Dragon_Fly_Inn_db;

USE Employee_Tracker_Dragon_Fly_Inn_db;

-- DROP TABLE IF EXISTS department;
CREATE TABLE  department(
  id INT AUTO_INCREMENT PRIMARY KEY,
  depName VARCHAR (30) -- to hold department name
);

-- DROP TABLE IF EXISTS role;
CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL, -- to hold role title
  salary DECIMAL(10,2), -- to hold role salary
  department_id INT, -- to hold reference to department role belongs to
  FOREIGN KEY (department_id) 
  References department (id)
  ON DELETE SET NULL
);

-- DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL, -- to hold employee first name
  last_name VARCHAR(30) NOT NULL, -- to hold employee last name
  role_id INT, -- to hold reference to employee role
  -- to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)
  manager_id INT, 
  FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE SET NULL, 
  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
  ON DELETE SET NULL
);
