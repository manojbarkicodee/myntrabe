const Joi = require("joi");

const emailCustomMessages = {
  "string.base": "Email is not valid",
  "string.email": "Email is not valid",
  "string.empty": "Email is required",
  "any.required": "Email is required",
};

const passwordCustomMessages = {
  "string.base": "Password is not valid",
  "string.empty": "password is required",
  "any.required": "password is required",
  "string.pattern.base":
    "password must contain uppercase letter and lower case letter and number and special characters",
  "string.min": "password must contain 8 characters",
  "string.max": "password can have 15 characters maximum",
};

const signupValidatorOptions = {
  validate: {
    payload: Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages(emailCustomMessages),

      password: Joi.string()
        .min(8)
        .max(15)
        .required()
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/)
        .messages(passwordCustomMessages),
    }),
    failAction: async (request, h, error) => {
      throw error;
    },
  },
};

let addressPayloadValidators = {
  options: {
    validate: {
      payload: Joi.object({
        name: Joi.string()
          .required()
          .messages({ "any.required": "this is mandatory field" }),
        phoneNumber: Joi.string()
          .length(10)
          .pattern(/^[0-9]+$/)
          .required()
          .messages({ "any.required": "this is mandatory field" }),
        pincode: Joi.string()
          .length(6)
          .pattern(/^[0-9]+$/)
          .required()
          .messages({ "any.required": "this is mandatory field" }),
        address: Joi.string()
          .required()
          .messages({ "any.required": "this is mandatory field" }),
        locality: Joi.string()
          .required()
          .messages({ "any.required": "this is mandatory field" }),
        district: Joi.string()
          .required()
          .messages({ "any.required": "this is mandatory field" }),
        state: Joi.string()
          .required()
          .messages({ "any.required": "this is mandatory field" }),
        belongsTo: Joi.string()
          .required()
          .messages({ "any.required": "this is mandatory field" }),
        default: Joi.boolean()
          .required()
          .messages({ "any.required": "this is mandatory field" }),
      }),
      failAction: async (request, h, error) => {
        throw error;
      },
    },
  },
};

let userDetailsPayloadValidators = {
  options: {
    validate: {
      payload: Joi.object({
        fullName: Joi.string()
          .required()
          .messages({ "any.required": "this is mandatory field" }),
        email: Joi.string()
          .email({ tlds: { allow: false } })
          .required()
          .messages(emailCustomMessages),
        mobileNumber: Joi.string()
          .length(10)
          .pattern(/^[0-9]+$/)
          .required()
          .messages({ "any.required": "this is mandatory field" }),
        alternateMobileNumber: Joi.string()
          .length(10)
          .pattern(/^[0-9]+$/)
          .required()
          .messages({ "any.required": "this is mandatory field" }),
        birthDate: Joi.string().messages({
          "any.required": "this is mandatory field",
        }),
        location: Joi.string()
          .required()
          .messages({ "any.required": "this is mandatory field" }),
        gender: Joi.string()
          .required()
          .messages({ "any.required": "this is mandatory field" }),
      }),
      failAction: async (request, h, error) => {
        throw error;
      },
    },
  },
};

module.exports = {
  signupValidatorOptions,
  addressPayloadValidators,
  userDetailsPayloadValidators,
};
