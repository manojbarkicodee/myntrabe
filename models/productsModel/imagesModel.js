const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db/database");

const images = sequelize.define(
  "Images",
  {
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: "products",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    tableName: "Images",
  }
);

module.exports = { images };
