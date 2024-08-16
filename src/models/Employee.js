const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Role = require("./Role");

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Role,
        key: "id",
      },
    },
    manager_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "Employees",
    timestamps: false, // Disable timestamps
  }
);

Employee.belongsTo(Role, { foreignKey: "role_id", as: "role" });

module.exports = Employee;
