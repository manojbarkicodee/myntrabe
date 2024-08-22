const { db } = require("../models");

const addressAddHandler = async (request, res) => {
  try {
    let body = request.payload;
    let userEmail = request.auth.credentials.userId;

    let { id: userId } = await db.users.findOne({
      where: {
        email: userEmail,
      },
    });

    if (userId) {
      body.userId = userId;
    }

    if (body.default) {
      await db.addresses.update(
        { default: false },
        {
          where: {
            userId: userId,
            default: true,
          },
        }
      );
    }

    await db.addresses.create(body);
    return res
      .response({
        statusCode: 201,
        status: "created",
        message: `address added successfully`,
      })
      .code(201);
  } catch (error) {
    return res.response(error).code(400);
  }
};

let addressGetHandler = async (request, res) => {
  try {
    let userEmail = request.auth.credentials.userId;

    let { id: userId } = await db.users.findOne({
      where: {
        email: userEmail,
      },
    });
    if (!userId) {
      return res.response({
        statusCode: 400,
        status: "error",
        message: `invalid user`,
      });
    }
    let addresses = await db.addresses.findAll({
      where: {
        userId: userId,
      },
      attributes: {
        exclude: "userId",
      },
    });

    return res.response(addresses).code(200);
  } catch (error) {
    return res.response(error).code(400);
  }
};

let addressDeleteHandler = async (request, res) => {
  try {
    let userEmail = request.auth.credentials.userId;
    let { id: addressId } = request.params;
console.log(userEmail,addressId)
    let { id: userId } = await db.users.findOne({
      where: {
        email: userEmail,
      },
    });

    await db.addresses.update({deleted:true},{
      where: {
        userId: userId,
        id: addressId,
      },
    });
    return res
      .response({
        statusCode: 204,
        status: "deleted",
        message: "address deleted successfuly",
      })
      .code(204);
  } catch (error) {
    console.log(error)
    return res.response(error);
  }
};

let addressUpdateHandler = async (request, res) => {
  try {
    let userEmail = request.auth.credentials.userId;
    let { id: addressId } = request.params;

    let { id: userId } = await db.users.findOne({
      where: {
        email: userEmail,
      },
    });

    let updateData = request.payload;

    await db.addresses.update(updateData, {
      where: {
        id: addressId,
        userId: userId,
      },
    });
    return res.response({
      statusCode: 200,
      status: "updated",
      message: "address updated successfuly",
    });
  } catch (error) {
    return res.response(error);
  }
};

let userDetailsEditHandler = async (request, res) => {
  try {
    let userDetails = request.payload;
    let userEmail = request.auth.credentials.userId;

    let { id: userId } = await db.users.findOne({
      where: {
        email: userEmail,
      },
    });

    await db.userDetails.update(userDetails, {
      where: {
        userId: userId,
      },
    });

    return res
      .response({
        statusCode: 200,
        status: "updated",
        message: "userDetails updated successfuly",
      })
      .code(200);
  } catch (error) {
    console.log(error);
    return res.response(error);
  }
};

let userDetailsGetHandler = async (request, res) => {
  try {
    const userEmail = request.auth.credentials.userId;

    const userDetails = await db.userDetails.findOne({
      attributes: { exclude: ["userId"] },
      include: [
        {
          model: db.users,
          required: true,
          where: {
            email: userEmail,
          },
          attributes: [],
        },
      ],
    });
    return res.response(userDetails).code(200);
  } catch (error) {
    console.log(error);
    return res.response(error);
  }
};

module.exports = {
  addressAddHandler,
  addressGetHandler,
  addressDeleteHandler,
  addressUpdateHandler,
  userDetailsEditHandler,
  userDetailsGetHandler,
};
