const { sequelize } = require("../../db/database");
const { DataTypes } = require("sequelize");

const products = sequelize.define(
  "product",
  {
    productName: { type: DataTypes.STRING, allowNull: false },
    productimage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mrp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ratings: {
      type: DataTypes.FLOAT(),
      allowNull: true,
    },
    ratingscount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    discount: {
      type: DataTypes.FLOAT(),
    },
    discountDisplayLabel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: "categories",
        key: "id",
      },
    },
    brandId: {
      type: DataTypes.INTEGER,
      references: {
        model: "brands",
        key: "id",
      },
    },
    discountLabel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    discountInpercentage: {
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {
        // var salt = bcrypt.genSaltSync(10);
        // var hash = bcrypt.hashSync(value, salt);
        let [discount, off] = value.split(" ");
        let [numDiscount, symbol] = discount.split("%");
        numDiscount = numDiscount.slice(1);
        this.setDataValue("discountInpercentage", numDiscount);
      },
    },
    primaryColour: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,

    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,
  }
);

module.exports = { products };
