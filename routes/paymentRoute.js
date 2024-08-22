const {
  addCardHandler,
  GetCardHandler,
  savedCardsDeleteHandler,
  savedCardsUpdateHandler,
} = require("../controllers/paymentController");
const { cardsPayloadValidators } = require("../joivalidators/validators");

let paymentRoutes = [
  {
    method: "post",
    path: "/cards",
    handler: addCardHandler,
    ...cardsPayloadValidators,
  },
  {
    method: "get",
    path: "/cards",
    handler: GetCardHandler,
  },
  {
    method: "DELETE",
    path: "/cards/{id}",
    handler: savedCardsDeleteHandler,
  },
  {
    method: "PUT",
    path: "/cards/{id}",
    handler: savedCardsUpdateHandler,
    ...cardsPayloadValidators,
  },
];

module.exports = { paymentRoutes };
