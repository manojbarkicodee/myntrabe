const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db/database");

const brands = sequelize.define(
  "brands",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { brands };
