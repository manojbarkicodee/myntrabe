const {
  cartGetProductsHandler,
  cartAddProductsHandler,
  cartDeleteProductsHandler,
  GetProductsCountHandler,
} = require("../controllers/cartController");
const {
  cartProductdataValidators,
} = require("../joivalidators/cartAndWishlistValidators");

let cartRoutes = [
  {
    method: "GET",
    path: "/cart",
    handler: cartGetProductsHandler,
  },
  {
    method: "POST",
    path: "/cart",
    handler: cartAddProductsHandler,
    ...cartProductdataValidators,
  },
  {
    method: "DELETE",
    path: "/cart/{id}",
    handler: cartDeleteProductsHandler,
  },
  {
    method: "GET",
    path: "/cart/count",
    handler: GetProductsCountHandler,
  },
];

module.exports = { cartRoutes };
