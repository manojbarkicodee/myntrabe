const Joi = require("joi");

const cartProductdataValidators = {
  options: {
    validate: {
      payload: Joi.object({
        productId: Joi.number()
          .required()
          .messages({ "any.required": "productId is required" }),
        size: Joi.string()
          .required()
          .messages({ "any.required": "size must be included" }),
      }),
      failAction: async (request, h, error) => {
        throw error;
      },
    },
  },
};

const wishlistProductdataValidators = {
  options: {
    validate: {
      payload: Joi.array().items(
        Joi.object({
          productId: Joi.number()
            .required()
            .messages({ "any.required": "productId is required" }),
        })
      ),
      failAction: async (request, h, error) => {
        throw error;
      },
    },
  },
};

let cardsPayloadValidators = {
  options: {
    validate: {
      payload: Joi.object({
        name: Joi.string()
          .required()
          .messages({ "any.required": "this is mandatory field" }),
        cardnumber: Joi.string()
          .length(16)
          .pattern(/^[0-9]+$/)
          .required()
          .messages({ "any.required": "this is mandatory field" }),
        cvvnumber: Joi.string()
          .length(3)
          .pattern(/^[0-9]+$/)
          .required()
          .messages({ "any.required": "this is mandatory field" }),
        expirydate: Joi.string().pattern(/^(0[1-9]|1[0-2])\/([0-9]{2})$/),
      }),
      failAction: async (request, h, error) => {
        throw error;
      },
    },
  },
};

module.exports = {
  cardsPayloadValidators,
  wishlistProductdataValidators,
  cartProductdataValidators,
};
