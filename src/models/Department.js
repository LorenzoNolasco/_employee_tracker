const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const Department = sequelize.define(
  "Department",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Departments",
    timestamps: false, // Disable timestamps
  }
);

module.exports = Department;
