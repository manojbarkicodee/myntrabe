const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db/database");

let ordersModel = sequelize.define(
  "orders",
  {
    userId: {
      type: DataTypes.INTEGER,
      allownull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    deliveryAddressId: {
      type: DataTypes.INTEGER,
      allownull: false,
      references: {
        model: "addresses",
        key: "id",
      },
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allownull: false,
    },
    discountedPrice: {
      type: DataTypes.INTEGER,
      allownull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allownull: false,
    },
    estimatedDeliveryDate: {
      type: DataTypes.DATEONLY,
      allownull: false,
    },
  },
  {
    timestamps: true,
    updatedAt: false,
    tableName: "orders",
  }
);

module.exports = { ordersModel };
