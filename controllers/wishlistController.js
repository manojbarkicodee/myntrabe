const { Op } = require("sequelize");
const { db } = require("../models");

const wishlistGetProducts = async (request, res) => {
  try {
    let userId = request.auth.credentials.userId;

    let wishlistProducts = await db.wishlist.findAll({
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
            attributes: [],
          },
          as: "products",
          attributes: {
            exclude: ["brandId", "categoryId"],
          },
          include: [
            {
              model: db.categories,
              required: true,
              attributes: ["title"],
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
    return res.response(wishlistProducts).code(200);
  } catch (error) {
    return res.response(error);
  }
};

const wishlistAddProductsHandler = async (request, res) => {
  try {
    const userId = request.auth.credentials.userId;
    const productId = request.payload;
    let length = productId.length;

    let customProductIds = [...productId];
    customProductIds = customProductIds.map((el) => {
      return el.productId;
    });

    const {
      wishlist: { id },
    } = await db.users.findOne({
      where: { email: userId },
      attributes: [],
      include: [
        {
          model: db.wishlist,
          required: true,
          attributes: ["id"],
        },
      ],
    });

    const product = await db.wishlistitems.findAll({
      where: {
        productId: {
          [Op.in]: customProductIds,
        },
        wishlistId: id,
      },
    });

    if (product.length > 0) {
      product.forEach((el) => {
        let index = productId.findIndex(
          (item) => +item.productId === el.productId
        );
        productId.splice(index, 1);
      });
    }

    productId.forEach((item) => {
      item.wishlistId = id;
    });

    await db.wishlistitems.bulkCreate(productId);
    return res
      .response({
        statusCode: 201,
        status: "added successfuly",
        message: `${length} items added to wishlist`,
      })
      .code(201);
  } catch (error) {
    return res.response(error);
  }
};

const wishlistDeleteProductsHandler = async (request, res) => {
  try {
    let userId = request.auth.credentials.userId;
    let { id: productId } = request.params;

    let { id: wishlistid } = await db.wishlist.findOne({
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

    // if (!wishlistid) {
    // }
    await db.wishlistitems.destroy({
      where: {
        productId: productId,
        wishlistId: wishlistid,
      },
    });
    return res
      .response({
        statusCode: 204,
        status: "deleted successfuly",
        message: "product deleted from wishlist",
      })
      .code(204);
  } catch (error) {
    return res.response(error);
  }
};
module.exports = {
  wishlistAddProductsHandler,
  wishlistDeleteProductsHandler,
  wishlistGetProducts,
};
