const { Op } = require("sequelize");
const { db } = require("../models");

const cartGetProductsHandler = async (request, res) => {
  try {
    let userId = request.auth.credentials.userId;

    let cartProducts = await db.cart.findAll({
      attributes: [],
      include: [
        {
          model: db.users,
          required: true,
          where: {
            email: userId,
          },
          attributes: [],
        },
        {
          model: db.products,
          through: {
            attributes: ["quantity", "size"],
            as: "productDetails",
          },
          as: "products",
          attributes: {
            exclude: ["brandId", "categoryId"],
          },
          include: [
            {
              model: db.brands,
              required: true,
              attributes: ["name"],
            },
            {
              model: db.sizes,
              as: "sizes",

              attributes: ["size"],
              through: {
                attributes: [],
              },
            },
          ],
        },
      ],
    });
    return res.response(cartProducts).code(200);
  } catch (error) {
    console.log(error)
    return res.response(error);
  }
};

const GetProductsCountHandler = async (request, res) => {
  try {
    let userId = request.auth.credentials.userId;
    let count = await db.cart.count({
      include: [
        {
          model: db.users,
          where: {
            email: userId,
          },
        },
        {
          model: db.products,
          through: {
            as: "productDetails",
          },
        },
      ],
    });

    return res.response({
      productsCount: count,
    });
  } catch (error) {
    return res.response(error);
  }
};

const cartAddProductsHandler = async (request, res) => {
  try {
    const userId = request.auth.credentials.userId;
    const { productId, size } = request.payload;
    const {
      cart: { id: cartid },
    } = await db.users.findOne({
      where: { email: userId },
      attributes: [],
      include: [
        {
          model: db.cart,
          required: true,
          attributes: ["id"],
        },
      ],
    });

    const product = await db.cartitems.findOne({
      where: {
        productId: productId,
        cartId: cartid,
      },
    });

    if (product) {
      await db.cartitems.increment("quantity", {
        by: 1,
        where: { productId: productId, cartId: cartid },
      });
      return res.response({
        statusCode: 201,
        status: "added successfuly",
        message: "product is already exist,increased quantity by 1",
      });
    }

    await db.cartitems.create({
      cartId: cartid,
      productId: productId,
      size: size,
    });

    return res
      .response({
        statusCode: 201,
        status: "added successfuly",
        message: "product added to cart",
      })
      .code(201);
  } catch (error) {
    console.log(error)
    return res.response(error);
  }
};

const cartDeleteProductsHandler = async (request, res) => {
  try {
    let userId = request.auth.credentials.userId;
    let { id: productId } = request.params;
    productId = productId.split(",").map((el) => Number(el));

    let { id: cartid } = await db.cart.findOne({
      include: [
        {
          model: db.users,
          required: true,
          where: {
            email: userId,
          },
        },
      ],
    });

    await db.cartitems.destroy({
      where: {
        productId: {
          [Op.in]: productId,
        },
        cartId: cartid,
      },
    });
    return res
      .response({
        statusCode: 204,
        status: "deleted successfully",
        message: "product deleted from cart",
      })
      .code(204);
  } catch (error) {
    return res.response(error);
  }
};

module.exports = {
  cartAddProductsHandler,
  cartDeleteProductsHandler,
  cartGetProductsHandler,
  GetProductsCountHandler,
};
