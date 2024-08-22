const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db/database");

const sizes = sequelize.define(
  "sizes",
  {
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "sizes",
  }
);

module.exports = { sizes };
