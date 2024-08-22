const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db/database");

const wishlistModel = sequelize.define(
  "wishlist",
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
    tableName: "wishlist",
  }
);
module.exports = { wishlistModel };
