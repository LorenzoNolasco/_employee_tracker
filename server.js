const express = require("express");
const figlet = require("figlet");
const inquirer = require("inquirer");
const sequelize = require("./src/config/dbConfig");
const departmentPrompt = require("./src/prompts/departmentPrompt");
const employeePrompt = require("./src/prompts/employeePrompt");
const rolePrompt = require("./src/prompts/rolePrompt");
const Department = require("./src/models/Department");
const Role = require("./src/models/Role");
const Employee = require("./src/models/Employee");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize
  .sync({ force: true })
  .then(() => {
    figlet("Employee Tracker", (err, data) => {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      console.log(data);
      displayMenu(); // Call the menu display function
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const displayMenu = async () => {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "Add a department",
        "View all roles",
        "Add a role",
        "View all employees",
        "Add an employee",
        "Exit",
      ],
    },
  ]);

  switch (answers.action) {
    case "View all departments":
      const departments = await Department.findAll();
      console.table(departments.map((department) => department.toJSON()));
      break;
    case "Add a department":
      const department = await departmentPrompt();
      await Department.create({ name: department.name });
      break;
    case "View all roles":
      const roles = await Role.findAll();
      console.table(roles.map((role) => role.toJSON()));
      break;
    case "Add a role":
      const role = await rolePrompt();
      await Role.create({
        title: role.title,
        salary: role.salary,
        department_id: role.department_id,
      });
      break;
    case "View all employees":
      const employees = await Employee.findAll({
        include: { model: Role, as: "role" },
      });
      console.table(
        employees.map((employee) => {
          const employeeJson = employee.toJSON();
          employeeJson.role = employee.role ? employee.role.title : "N/A"; // Display role title
          return employeeJson;
        })
      );
      break;
    case "Add an employee":
      const employee = await employeePrompt();
      await Employee.create({
        first_name: employee.first_name,
        last_name: employee.last_name,
        role_id: employee.role_id,
        manager_id: employee.manager_id,
      });
      break;
    case "Exit":
      process.exit();
  }

  displayMenu(); // Display the menu again
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
