const { Op } = require("sequelize");

let filterQuery = (filterby) => {
  let filterorder = [];
  let priceCondition = [];
  let discountCondition = [];
  let colorCondition = [];
  let newfilter = filterby;

  if (filterby.sort) {
    delete newfilter.sort;
  }

  if (newfilter.discount) {
    const discountvalues = newfilter.discount.split(",").map((el) => {
      [min, max] = el.split(":").map((el) => el);
      return { min, max };
    });

    let discountqueryconditions = discountvalues.map((el) => {
      return {
        discountInpercentage: {
          [Op.between]: [el.min, el.max],
        },
      };
    });

    discountCondition = {
      [Op.or]: discountqueryconditions,
    };
  }

  if (newfilter.color) {
    let colorvalues = newfilter.color.split(",");
    colorCondition = {
      primaryColour: {
        [Op.in]: colorvalues,
      },
    };
  }

  if (newfilter.price) {
    const pricevalues = newfilter.price.split(",").map((el) => {
      [min, max] = el.split(":").map((el) => +el);
      return { min, max };
    });

    let pricequeryconditions = pricevalues.map((el) => {
      return {
        price: {
          [Op.between]: [el.min, el.max],
        },
      };
    });

    priceCondition = {
      [Op.or]: pricequeryconditions,
    };
  }

  if (newfilter.price || newfilter.discount || newfilter.color) {
    filterorder = {
      where: {
        ...priceCondition,
        ...discountCondition,
        ...colorCondition,
      },
    };
  }
  return filterorder;
};

let sortquery = (sort) => {
  let order = [];
  const [column, sortorder] = sort?.split(":");
  order = { order: [[column, sortorder?.toUpperCase()]] };
  return order;
};

module.exports = { filterQuery, sortquery };
