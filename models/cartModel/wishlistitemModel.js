const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db/database");

const wishlistitemsModel = sequelize.define(
  "wishlistitems",
  {
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: "products",
        key: "id",
      },
    },
    wishlistId: {
      type: DataTypes.INTEGER,
      references: {
        model: "wishlist",
        key: "id",
      },
    },
  },

  {
    timestamps: false,
    tableName: "wishlistitems",
  }
);
module.exports = { wishlistitemsModel };
