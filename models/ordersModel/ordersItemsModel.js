const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db/database");

let orderItemsModel = sequelize.define(
  "ordersItems",
  {
    productId: {
      type: DataTypes.INTEGER,
      allownull: false,
      references: {
        model: "products",
        key: "id",
      },
    },
    orderId: {
      type: DataTypes.INTEGER,
      allownull: false,
      references: {
        model: "orders",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allownull: false,
    },
    size: {
      type: DataTypes.STRING,
      allownull: false,
    },

    cancel: {
      type: DataTypes.BOOLEAN,
      allownull: false,
      defaultValue:false
    }

  },
  {
    timestamps: false,
    tableName: "ordersItems",
  }
);

module.exports = { orderItemsModel };
