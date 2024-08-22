const { Sequelize } = require("sequelize");
const { sequelize } = require("../db/database");
const { products } = require("./productsModel/productsModel");
const { categories } = require("./productsModel/categoryModel");
const { brands } = require("./productsModel/brandsModel");
const { images } = require("./productsModel/imagesModel");
const { sizes } = require("./productsModel/sizesModel");
const { productDetails } = require("./productsModel/productdetailsModel");
const { userModel } = require("./userModel/authenticationModel");
const { cartModel } = require("./cartModel/cartmodel");
const { wishlistModel } = require("./cartModel/wishListModel");
const { cartitemsModel } = require("./cartModel/cartitemsModel");
const { wishlistitemsModel } = require("./cartModel/wishlistitemModel");
const { addressesModel } = require("./userModel/addressModel");
const { cardsModel } = require("./paymentModel/cardsModel");
const { ordersModel } = require("./ordersModel/ordersModel");
const { orderItemsModel } = require("./ordersModel/ordersItemsModel");
const { userDetailsModel } = require("./userModel/userDetailsModel");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.products = products;
db.categories = categories;
db.brands = brands;
db.images = images;
db.sizes = sizes;
db.productDetails = productDetails;
db.users = userModel;
db.cart = cartModel;
db.wishlist = wishlistModel;
db.cartitems = cartitemsModel;
db.wishlistitems = wishlistitemsModel;
db.addresses = addressesModel;
db.cards = cardsModel;
db.orders = ordersModel;
db.ordersItems = orderItemsModel;
db.userDetails = userDetailsModel;

db.categories.hasMany(
  db.products,
  { foreignKey: "categoryId" },
  { as: "category" }
);
db.products.belongsTo(
  db.categories,
  { foreignKey: "categoryId" },
  { as: "category" }
);

db.brands.hasMany(db.products, { foreignKey: "brandId" }, { as: "brand" });
db.products.belongsTo(db.brands, { foreignKey: "brandId" }, { as: "brand" });

db.products.hasMany(db.images, { foreignKey: "ProductId" }, { as: "images" });
db.images.belongsTo(db.products, { foreignKey: "ProductId" }, { as: "images" });

db.products.belongsToMany(db.sizes, { through: productDetails });
db.sizes.belongsToMany(db.products, { through: productDetails });

db.users.hasOne(db.cart, { foreignKey: "userId" }, { as: "user" });
db.cart.belongsTo(db.users, { foreignKey: "userId" }, { as: "user" });

db.users.hasOne(db.wishlist, { foreignKey: "userId" }, { as: "user" });
db.wishlist.belongsTo(db.users, { foreignKey: "userId" }, { as: "user" });

db.cart.belongsToMany(db.products, { through: db.cartitems });
db.products.belongsToMany(db.cart, { through: db.cartitems });

db.wishlist.belongsToMany(db.products, { through: db.wishlistitems });
db.products.belongsToMany(db.wishlist, { through: db.wishlistitems });

db.users.hasMany(db.addresses, { foreignKey: "userId" }, { as: "user" });
db.addresses.belongsTo(db.users, { foreignKey: "userId" }, { as: "user" });

db.users.hasMany(db.cards, { foreignKey: "userId" }, { as: "user" });
db.cards.belongsTo(db.users, { foreignKey: "userId" }, { as: "user" });

db.orders.belongsTo(db.users, { foreignKey: "userId" }, { as: "user" });
db.users.hasMany(db.orders, { foreignKey: "userId" }, { as: "user" });

db.orders.belongsTo(
  db.addresses,
  { foreignKey: "deliveryAddressId" },
  { as: "address" }
);
db.addresses.hasMany(
  db.orders,
  { foreignKey: "deliveryAddressId" },
  { as: "addresss" }
);

db.orders.belongsToMany(db.products, { through: db.ordersItems });
db.products.belongsToMany(db.orders, { through: db.ordersItems });

db.users.hasOne(db.userDetails, { foreignKey: "userId" }, { as: "user" });
db.userDetails.belongsTo(db.users, { foreignKey: "userId" }, { as: "user" });

module.exports = { db };
