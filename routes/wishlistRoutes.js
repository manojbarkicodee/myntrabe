const {
  wishlistGetProducts,
  wishlistAddProductsHandler,
  wishlistDeleteProductsHandler,
} = require("../controllers/wishlistController");
const {
  wishlistProductdataValidators,
} = require("../joivalidators/cartAndWishlistValidators");

let wishlistRoutes = [
  {
    method: "GET",
    path: "/wishlist",
    handler: wishlistGetProducts,
  },
  {
    method: "POST",
    path: "/wishlist",
    handler: wishlistAddProductsHandler,
    ...wishlistProductdataValidators,
  },
  {
    method: "DELETE",
    path: "/wishlist/{id}",
    handler: wishlistDeleteProductsHandler,
  },
];

module.exports = { wishlistRoutes };
