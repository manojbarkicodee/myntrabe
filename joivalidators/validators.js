const Joi = require("joi");

const validateGetOptions = {
  validate: {
    params: Joi.object({
      category: Joi.string().min(3).max(10),
    }),
    query: Joi.object({
      search: Joi.string().max(500),
    }),
  },
};

const orderItemsPayload = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().required(),
  size: Joi.string().required(),
});

const ordersPayloadValidators = {
  options: {
    validate: {
      payload: Joi.object({
        deliveryAddressId: Joi.number().required(),
        totalPrice: Joi.number().required(),
        discountedPrice: Joi.number().required(),
        paymentMethod: Joi.string().required(),
        estimatedDeliveryDate: Joi.string().required(),
        products: Joi.array().items(orderItemsPayload),
      }),
      failAction: async (request, h, error) => {
        throw error;
      },
    },
  },
};
module.exports = {
  validateGetOptions,
  ordersPayloadValidators,
};
