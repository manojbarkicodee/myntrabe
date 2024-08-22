const {
  getProductHandlerByCategory,
  getProductHandlerById,
  getBrandsHandlerByCategory,
  getColorsHandlerByCategory,
  getSimilarProductsHandlerByCategory,
  searchBrandsHandler,
} = require("../controllers/productsController");
const {
  productGetByCategoryOptions,
  IndivisualProductGetOptions,
} = require("../joivalidators/productsValidators");
const { validateGetOptions } = require("../joivalidators/validators");

let productsRoutes = [
  {
    method: "GET",
    path: "/products/{category?}",
    config: {
      ...productGetByCategoryOptions,
      auth: false,
    },
    handler: getProductHandlerByCategory,
  },
  {
    method: "GET",
    path: "/products/{category}/{id}",
    handler: getProductHandlerById,
    config: {
      ...IndivisualProductGetOptions,
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/products/brands/{category}",
    handler: getBrandsHandlerByCategory,
    config: {
      ...validateGetOptions,
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/products/colors/{category?}",
    handler: getColorsHandlerByCategory,
    config: {
      ...validateGetOptions,
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/products/{category}/similar",
    handler: getSimilarProductsHandlerByCategory,
    config: {
      ...validateGetOptions,
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/brands",
    handler: searchBrandsHandler,
    config: {
      auth: false,
    },
  },
];

module.exports = { productsRoutes };
