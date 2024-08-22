const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db/database");

let cardsModel = sequelize.define(
  "cards",
  {
    cardnumber: {
      type: DataTypes.BIGINT,
      allownull: false,
    },
    name: {
      type: DataTypes.STRING,
      allownull: false,
    },
    expirydate: {
      type: DataTypes.DATEONLY,
      allownull: false,
    },
    cvvnumber: {
      type: DataTypes.INTEGER,
      allownull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allownull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    tableName: "cards",
  }
);

module.exports = { cardsModel };
