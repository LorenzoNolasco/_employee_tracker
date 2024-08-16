const inquirer = require("inquirer");
const Role = require("../models/Role");

const employeePrompt = async () => {
  // Fetch available roles
  const roles = await Role.findAll();
  const roleChoices = roles.map((role) => ({
    name: role.title,
    value: role.id,
  }));

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "Enter the employee's first name:",
    },
    {
      type: "input",
      name: "last_name",
      message: "Enter the employee's last name:",
    },
    {
      type: "list",
      name: "role_id",
      message: "Select the employee's role:",
      choices: roleChoices,
    },
    {
      type: "input",
      name: "manager_id",
      message: "Enter the employee's manager ID (if any):",
      validate: (input) => {
        return (
          input === "" ||
          !isNaN(parseInt(input)) ||
          "Please enter a valid number"
        );
      },
      filter: (input) => {
        return input === "" ? null : parseInt(input);
      },
    },
  ]);

  return answers;
};

module.exports = employeePrompt;
