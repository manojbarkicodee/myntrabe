const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db/database");
// var bcrypt = require("bcryptjs");

let addressesModel = sequelize.define(
  "addresses",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    phoneNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      required: true,
    },
    pincode: {
      type: DataTypes.BIGINT,
      allowNull: false,
      required: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    locality: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    belongsTo: {
      type: DataTypes.ENUM,
      values: ["home", "work"],
      allowNull: false,
      required: true,
    },
    default: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      required: true,
    },
    deleted:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:false
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
    tableName: "addresses",
  }
);

module.exports = { addressesModel };
