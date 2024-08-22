const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db/database");

const categories = sequelize.define(
  "categories",
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
  },
  {
    tableName: "categories",
    timestamps: false,
  }
);

module.exports = { categories };
