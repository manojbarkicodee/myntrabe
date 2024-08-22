const { db } = require("../models");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

let signupUserHandler = async (request, res) => {
  try {
    let payload = request.payload;
    await db.users.create(payload);
    return res
      .response({
        message: "signup successfull",
        status: "created",
        statusCode: 201,
      })
      .code(201);
  } catch (error) {
    let errormessage = error.errors[0].message;
    console.log(errormessage);
    return res
      .response({
        error: "Bad request",
        stausCode: 400,
        message: errormessage,
      })
      .code(400);
  }
};

let loginUserHandler = async (request, res) => {
  try {
    let payload = request.payload;
    let user = await db.users.findOne({ where: { email: payload.email } });

    if (!user) {
      return res
        .response({
          statusCode: 404,
          error: "Not Found",
          message: "missing email",
        })
        .code(404);
    }
    let check = await bcrypt.compareSync(payload.password, user.password);

    if (!check) {
      return res
        .response({
          statusCode: 400,
          error: "Bad Request",
          message: "Invalid password",
        })
        .code(400);
    }

    let token = await jwt.sign({ userId: user.email }, process.env.jwtKey, {
      algorithm: process.env.jwtAlgorithm,
    });

    if (token) {
      let cart = await db.cart.findOne({
        where: {
          userId: user.id,
        },
      });

      let userDetails = await db.userDetails.findOne({
        where: {
          userId: user.id,
        },
      });
      let wishlist = await db.wishlist.findOne({
        where: {
          userId: user.id,
        },
      });
      if (!cart) {
        await db.cart.create({ userId: user.id });
      }

      if (!wishlist) {
        await db.wishlist.create({ userId: user.id });
      }

      if (!userDetails) {
        await db.userDetails.create({ userId: user.id });
        await db.userDetails.update(
          { email: payload.email },
          {
            where: {
              userId: user.id,
            },
          }
        );
      }
    }
    return res
      .response({
        statusCode: 200,
        token: token,
        message: "Login successfull",
      })
      .code(200);
  } catch (err) {
    return res.response(err);
  }
};

const validate = async (decoded, request) => {
  try {
    let user = await db.users.findOne({ where: { email: decoded.userId } });
    if (user) {
      return { isValid: true };
    }

    return { isValid: false };
  } catch (err) {
    return { isValid: false };
  }
};

module.exports = { signupUserHandler, loginUserHandler, validate };
