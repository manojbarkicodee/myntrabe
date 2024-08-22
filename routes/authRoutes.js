const {
  signupUserHandler,
  loginUserHandler,
} = require("../controllers/authController");
const { signupValidatorOptions } = require("../joivalidators/userValidators");

let authRoutes = [
  {
    method: "POST",
    path: "/signup",
    handler: signupUserHandler,
    config: {
      auth: false,
      ...signupValidatorOptions,
    },
  },
  {
    method: "POST",
    path: "/login",
    handler: loginUserHandler,
    config: {
      auth: false,
      ...signupValidatorOptions,
    },
  },
];

module.exports = { authRoutes };
