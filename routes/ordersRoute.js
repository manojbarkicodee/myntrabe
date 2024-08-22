const {
  ordersAddProductHandler,
  ordersGetProductHandler,
  ordersDeleteHandler,
} = require("../controllers/orderController");
const { ordersPayloadValidators } = require("../joivalidators/validators");

let ordersRoutes = [
  {
    method: "POST",
    path: "/order",
    handler: ordersAddProductHandler,
    ...ordersPayloadValidators,
  },
  {
    method: "GET",
    path: "/order",
    handler: ordersGetProductHandler,
  },
  {
    method: "PATCH",
    path: "/order/{orderId}/{productId}",
    handler: ordersDeleteHandler,
  },
];

module.exports = { ordersRoutes };
