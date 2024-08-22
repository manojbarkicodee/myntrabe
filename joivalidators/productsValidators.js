const Joi = require("joi");

const productGetByCategoryOptions = {
  validate: {
    params: Joi.object({
      category: Joi.string().min(3).max(10),
      similar: Joi.string().min(3).max(10),
    }),
    query: Joi.object({
      color: Joi.string().min(3).max(500),
      sort: Joi.string().min(3).max(500),
      price: Joi.string().min(3).max(500),
      brand: Joi.string().min(3).max(500),
      discount: Joi.string().min(3).max(500),
      search: Joi.string().min(1).max(500),
    }),
  },
};

const IndivisualProductGetOptions = {
  validate: {
    params: Joi.object({
      category: Joi.string().min(3).max(10).required(),
      id: Joi.number(),
    }),
  },
};

module.exports = {
  productGetByCategoryOptions,
  IndivisualProductGetOptions,
};
