const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db/database");

const cartitemsModel = sequelize.define(
  "cartitems",
  {
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    selected: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "cart",
        key: "id",
      },
    },
  },

  {
    timestamps: false,
    tableName: "cartitems",
  }
);
module.exports = { cartitemsModel };
