const Employee = require("../models/Employee");

const createEmployee = async (first_name, last_name, role_id, manager_id) => {
  return await Employee.create({ first_name, last_name, role_id, manager_id });
};

const getEmployees = async () => {
  return await Employee.findAll();
};

module.exports = { createEmployee, getEmployees };
