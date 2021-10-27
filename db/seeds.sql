-- the information for tables 
INSERT INTO department (depName)
VALUES ("Restuarant"),
       ("Front Desk"),
       ("Human Resources"),
       ("Maintence");

INSERT INTO role (title, salary, department_id)
VALUES ("Chef", 100000.00, 1),
       ("Manager", 150000.00, 3),
       ("Concierge", 80000.00, 2),
       ("Handy Man", 45000.00, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Sookie", "St James", 1),
       ("Lorelai", "Gilmore", 3),
       ("Michel", "Gerard", 2),
       ("Rune", "Belleville", 4);

UPDATE employee
SET manager_id = 2
WHERE id IN (1,3,4);