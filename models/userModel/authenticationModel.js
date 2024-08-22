const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db/database");
var bcrypt = require("bcryptjs");

let userModel = sequelize.define(
  "user",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notNull: true,
      },
      unique: {
        args: true,
        msg: "Email already in use",
      },
      required: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(value, salt);
        this.setDataValue("password", hash);
      },
      validate: {
        notNull: true,
      },
    },
  },
  {
    timestamps: false,
    tableName: "Users",
  }
);

module.exports = { userModel };
