-- DROP DATABASE IF EXISTS employee_DB;
-- CREATE database employee_DB;

USE employee_DB;

-- CREATE TABLE department (
--   id INT AUTO_INCREMENT NOT NULL,
--   name VARCHAR(30),
--   PRIMARY KEY(id)
-- );

-- CREATE TABLE role (
--   id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--   title VARCHAR(30),
--   salary DECIMAL,
--   department_id INT
-- 	FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
-- );

-- CREATE TABLE employee (
--   id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--   first_name VARCHAR(30),
--   last_name VARCHAR(30),
--   role_id INT,
--   manager_id INT
--   FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE
-- );



SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;


-- INSERT INTO employee (firstName, lastName) values ('Umberto', 'Eco'),('John','Doe'),('Agent', 'Smith');
-- INSERT INTO role (title, salary) values ('Head of design', 200),('VP of Developemnt', 200),('CRO', 180);
-- INSERT INTO department (name) values ('design','development','management');
