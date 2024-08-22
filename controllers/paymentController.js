const { db } = require("../models");

let addCardHandler = async (request, res) => {
  try {
    let userEmail = request.auth.credentials.userId;

    let body = request.payload;
    let { id: userId } = await db.users.findOne({
      where: {
        email: userEmail,
      },
    });

    if (!userId) {
      return res
        .response({
          statusCode: 400,
          status: "Bad request",
          message: "user doesn't exists",
        })
        .code(400);
    }
    let card = await db.cards.findOne({
      where: {
        userId: userId,
        cardnumber: Number(body.cardnumber),
      },
    });

    if (card) {
      return res.response({
        statusCode: 400,
        status: "bad request",
        message: "card already exists",
      });
    }
    let [month, year] = body.expirydate.split("/");
    let currentYear = new Date().getFullYear().toString().slice(0, 2);
    let date = `${currentYear}${year}-${month}-28`;
    body.expirydate = date;
    body.userId = userId;
    body.cardnumber = Number(body.cardnumber);
    await db.cards.create({ ...body });

    return res
      .response({
        statusCode: 201,
        status: "created successfully",
        message: "card added successfully",
      })
      .code(201);
  } catch (error) {
    return res.response(error);
  }
};

let GetCardHandler = async (request, res) => {
  try {
    let userEmail = request.auth.credentials.userId;

    let cards = await db.cards.findAll({
      attributes: {
        exclude: ["userId"],
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
      ],
    });
    return res.response(cards).code(200);
  } catch (error) {
    return res.response(error);
  }
};

let savedCardsDeleteHandler = async (request, res) => {
  try {
    let userEmail = request.auth.credentials.userId;
    let { id: cardId } = request.params;

    let { id: userId } = await db.users.findOne({
      where: {
        email: userEmail,
      },
    });

    if (!userId) {
      return res.response({
        statusCode: 400,
        status: "Bad request",
        message: "User doesn't exists",
      });
    }

    let card = await db.cards.findOne({
      where: {
        id: cardId,
      },
    });

    if (!card) {
      return res.response({
        statusCode: 400,
        status: "Bad request",
        message: "card doesn't exists",
      });
    }

    await db.cards.destroy({
      where: {
        userId: userId,
        id: cardId,
      },
    });
    return res
      .response({
        statusCode: 204,
        status: "deleted",
        message: "card deleted successfuly",
      })
      .code(204);
  } catch (error) {
    return res.response(error);
  }
};

let savedCardsUpdateHandler = async (request, res) => {
  try {
    let userEmail = request.auth.credentials.userId;
    let { id: cardId } = request.params;

    let { id: userId } = await db.users.findOne({
      where: {
        email: userEmail,
      },
    });

    if (!userId) {
      return res.response({
        statusCode: 400,
        status: "Bad request",
        message: "User doesn't exists",
      });
    }

    let updateData = request.payload;

    let card = await db.cards.findOne({
      where: {
        id: cardId,
      },
    });

    if (!card) {
      return res.response({
        statusCode: 400,
        status: "Bad request",
        message: "card doesn't exists",
      });
    }
    await db.cards.update(updateData, {
      where: {
        id: cardId,
        userId: userId,
      },
    });
    return res.response({
      statusCode: 200,
      status: "updated",
      message: "card updated successfuly",
    });
  } catch (error) {
    return res.response(error);
  }
};

module.exports = {
  addCardHandler,
  GetCardHandler,
  savedCardsDeleteHandler,
  savedCardsUpdateHandler,
};
