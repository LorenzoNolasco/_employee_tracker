const Role = require("../models/Role");

const createRole = async (title, salary, department_id) => {
  return await Role.create({ title, salary, department_id });
};

const getRoles = async () => {
  return await Role.findAll();
};

module.exports = { createRole, getRoles };
