const { db } = require("../models");
const { filterQuery, sortquery } = require("../helpers/helper");
const { Op } = require("sequelize");
let getProductHandlerByCategory = async (request, res) => {
  try {
    const { sort, brand, color, price, discount, search } = request.query;
    const { category } = request.params;
    let orderbyprice = [];
    let filterbybrand = [];
    let products = [];
    let filterby = [];
    let filterbyCategory = [];
    let searchByBrand = [];

    if (price || discount || color) {
      filterby = filterQuery(request.query);
    }

    if (sort) {
      orderbyprice = sortquery(sort);
    }

    if (brand) {
      let brandvalues = brand.split(",");
      filterbybrand = {
        where: {
          name: {
            [Op.in]: brandvalues,
          },
        },
      };
    }

    if (category) {
      filterbyCategory = {
        where: { title: category },
      };
    }

    if (search) {
      searchByBrand = {
        where: {
          name: { [Op.substring]: search },
        },
      };
    }

    products = await db.products.findAll({
      attributes: {
        exclude: ["brandId", "categoryId"],
      },
      ...orderbyprice,
      ...filterby,
      include: [
        {
          model: db.categories,
          required: true,
          attributes: ["title"],
          ...filterbyCategory,
        },
        {
          model: db.brands,
          required: true,
          attributes: ["name"],
          ...filterbybrand,
          ...searchByBrand,
        },
        {
          model: db.images,
          required: true,
          attributes: ["imageUrl"],
        },
      ],
    });

    return res.response(products).code(200);
  } catch (error) {
    return res.response(error);
  }
};

let getProductHandlerById = async (request, res) => {
  try {
    let product = [];
    let { category, id } = request.params;
    if (id) {
      product = await db.products.findOne({
        attributes: {
          exclude: ["brandId", "categoryId"],
        },
        include: [
          {
            model: db.categories,
            required: true,
            where: { title: category },
            attributes: ["title"],
          },

          {
            model: db.brands,
            required: true,
            attributes: ["name"],
          },
          {
            model: db.images,
            required: true,
            attributes: ["imageUrl"],
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
        where: {
          id: id,
        },
      });
    }
    return res.response(product).code(200);
  } catch (err) {
    return res.response(err).code(400);
  }
};

let getBrandsHandlerByCategory = async (request, res) => {
  try {
    let { category } = request.params;
    let brands = await db.brands.findAll({
      include: [
        {
          model: db.products,
          required: true,
          attributes: [],

          include: [
            {
              model: db.categories,
              required: true,
              where: {
                title: category,
              },
              attributes: [],
            },
          ],
        },
      ],
    });
    return res.response(brands).code(200);
  } catch (error) {

    return res.response(error).code(400);
  }
};

const getColorsHandlerByCategory = async (request, res) => {
  try {
    const { category } = request.params;

    const { search } = request.query;
    let colorsByCategory = [];

    let colorsByBrands = [];

    if (category) {
      colorsByCategory = [
        {
          model: db.categories,
          required: true,
          where: {
            title: category,
          },
          attributes: [],
        },
      ];
    }
    if (search) {
      colorsByBrands = [
        {
          model: db.brands,
          required: true,
          where: {
            name: { [Op.substring]: search },
          },
          attributes: [],
        },
      ];
    }
    const colors = await db.products.findAll({
      attributes: ["primaryColour"],
      group: ["primaryColour"],
      include: [...colorsByCategory, ...colorsByBrands],
    });

    return res.response(colors);
  } catch (error) {
    return res.response(error).code(400);
  }
};

const getSimilarProductsHandlerByCategory = async (request, res) => {
  try {
    let products = [];
    let { category } = request.params;
    if (category) {
      products = await db.products.findAll({
        limit: 10,
        attributes: {
          exclude: ["brandId", "categoryId"],
        },
        where: {
          brandId: { [Op.ne]: 43 },
        },

        include: [
          {
            model: db.categories,
            required: true,
            attributes: ["title"],
            where: { title: category },
          },
          {
            model: db.brands,
            required: true,
            attributes: ["name"],
          },
        ],
      });
    }
    return res.response(products).code(200);
  } catch (error) {
    return res.response(error).code(400);
  }
};

let searchBrandsHandler = async (request, res) => {
  try {
    let { search } = request.query;
    let brands = await db.brands.findAll({
      where: {
        name: { [Op.substring]: search },
      },
    });

    return res.response(brands);
  } catch (error) {
    return res.response(error);
  }
};

module.exports = {
  getProductHandlerByCategory,
  getProductHandlerById,
  getBrandsHandlerByCategory,
  getColorsHandlerByCategory,
  getSimilarProductsHandlerByCategory,
  searchBrandsHandler,
};
