const inquirer = require("inquirer");

const departmentPrompt = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the department name:",
    },
  ]);
  return answers;
};

module.exports = departmentPrompt;
