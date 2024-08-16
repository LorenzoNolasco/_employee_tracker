const inquirer = require("inquirer");
const Department = require("../models/Department");

const rolePrompt = async () => {
  // Fetch available departments
  const departments = await Department.findAll();
  const departmentChoices = departments.map((department) => ({
    name: department.name,
    value: department.id,
  }));

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter the role title:",
    },
    {
      type: "input",
      name: "salary",
      message: "Enter the role salary (numeric value):",
      validate: (input) => {
        return !isNaN(parseFloat(input)) || "Please enter a valid number";
      },
      filter: (input) => {
        return parseFloat(input);
      },
    },
    {
      type: "list",
      name: "department_id",
      message: "Select the department for this role:",
      choices: departmentChoices,
    },
  ]);
  return answers;
};

module.exports = rolePrompt;
