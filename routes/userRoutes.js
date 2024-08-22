const {
  addressAddHandler,
  addressGetHandler,
  addressDeleteHandler,
  addressUpdateHandler,
  userDetailsEditHandler,
  userDetailsGetHandler,
} = require("../controllers/userController");
const {
  userDetailsPayloadValidators,
} = require("../joivalidators/userValidators");
const { addressPayloadValidators } = require("../joivalidators/validators");

let userRoutes = [
  {
    method: "POST",
    path: "/address",
    handler: addressAddHandler,
    ...addressPayloadValidators,
  },
  {
    method: "GET",
    path: "/address",
    handler: addressGetHandler,
  },
  {
    method: "DELETE",
    path: "/address/{id}",
    handler: addressDeleteHandler,
  },
  {
    method: "PUT",
    path: "/address/{id}",
    handler: addressUpdateHandler,
    ...addressPayloadValidators,
  },
  {
    method: "PUT",
    path: "/profile/edit",
    handler: userDetailsEditHandler,
    ...userDetailsPayloadValidators,
  },
  {
    method: "GET",
    path: "/profile",
    handler: userDetailsGetHandler,
  },
];

module.exports = { userRoutes };
