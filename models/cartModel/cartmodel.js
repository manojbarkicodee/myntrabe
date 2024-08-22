const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db/database");

const cartModel = sequelize.define(
  "cart",
  {
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
    tableName: "cart",
  }
);
module.exports = { cartModel };
