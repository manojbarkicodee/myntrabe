const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db/database");

const productDetails = sequelize.define(
  "productDetails",
  {
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: "products",
        key: "id",
      },
    },
    sizeId: {
      type: DataTypes.INTEGER,
      references: {
        model: "sizes",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);
module.exports = { productDetails };
