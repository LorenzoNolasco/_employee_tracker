const Department = require("../models/Department");

const createDepartment = async (name) => {
  return await Department.create({ name });
};

const getDepartments = async () => {
  return await Department.findAll();
};

module.exports = { createDepartment, getDepartments };
