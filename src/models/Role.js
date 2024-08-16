const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Department = require("./Department");

const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    department_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Department,
        key: "id",
      },
    },
  },
  {
    tableName: "Roles",
    timestamps: false, // Disable timestamps
  }
);

module.exports = Role;
