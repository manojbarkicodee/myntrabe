const { db } = require("../models");

let ordersAddProductHandler = async (request, res) => {
  try {
    let orderConfirmedId;
    let userEmail = request.auth.credentials.userId;
    let payload = request.payload;

    let { id: userId } = await db.users.findOne({
      where: {
        email: userEmail,
      },
    });

    if (userId) {
      let orderPayload = {
        userId: userId,
        deliveryAddressId: payload.deliveryAddressId,
        totalPrice: payload.totalPrice,
        discountedPrice: payload.discountedPrice,
        paymentMethod: payload.paymentMethod,
        estimatedDeliveryDate: payload.estimatedDeliveryDate,
      };
      await db.orders.create(orderPayload);

      let { id: orderId } = await db.orders.findOne({
        where: {
          userId: userId,
        },
        order: [["id", "DESC"]],
      });
      orderConfirmedId=orderId
      let orderItemsPayload = payload.products.map((product) => {
        product.orderId = orderId;
        return product;
      });

      await db.ordersItems.bulkCreate(orderItemsPayload);
    } else {
      return res
        .response({
          statusCode: 400,
          status: "Bad Request",
          message: "User Not Exists",
        })
        .code(400);
    }
    return res
      .response({
        statusCode: 201,
        status: "confirmed",
        message: "Order Confirmed",
        orderId:orderConfirmedId
      })
      .code(201);
  } catch (error) {
    console.log(error);
    return res.response(error);
  }
};

let ordersGetProductHandler = async (request, res) => {
  try {
    let userEmail = request.auth.credentials.userId;

    let orders = await db.orders.findAll({
      attributes: {
        exclude: ["userId", "deliveryAddressId"],
      },
      include: [
        {
          model: db.users,
          required: true,
          where: {
            email: userEmail,
          },
          attributes: [],
        },

        {
          model: db.addresses,
          required: true,
          attributes: {
            exclude: ["id", "userId"],
          },
        },
        {
          model: db.products,

          through: {
            attributes: ["quantity", "size", "cancel"],
          },
          as: "products",
          include: [
            {
              model: db.categories,
              required: true,
              attributes: ["title"],
            },
          ],
          attributes: {
            exclude: ["brandId", "categoryId"],
          },
        },
      ],
    });

    return res.response(orders).code(200);
  } catch (error) {
    return res.response(error);
  }
};

let ordersDeleteHandler = async (request, res) => {
  try {
    let { orderId, productId } = request.params;

    await db.ordersItems.update(
      { cancel: true },
      {
        where: {
          orderId: orderId,
          productId: productId,
        },
      }
    );
    return res
      .response({
        statusCode: 200,
        status: "deleted",
        message: "Ordered product deleted successfuly",
      })
      .code(200);
  } catch (error) {
    console.log(error);
    return res.response(error);
  }
};

module.exports = {
  ordersAddProductHandler,
  ordersGetProductHandler,
  ordersDeleteHandler,
};

// module.exports = { ordersAddProductHandler, ordersGetProductHandler };
