const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db/database");

let userDetailsModel = sequelize.define(
  "userDetails",
  {
    fullName: {
      type: DataTypes.STRING,
      required: true,
    },
    email: {
      type: DataTypes.STRING,
    },
    mobileNumber: {
      type: DataTypes.BIGINT,
    },
    birthDate: {
      type: DataTypes.DATEONLY,
    },
    gender: {
      type: DataTypes.ENUM,
      values: ["male", "female"],
    },
    alternateMobileNumber: {
      type: DataTypes.BIGINT,
    },
    location: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    tableName: "userDetails",
  }
);

module.exports = { userDetailsModel };
