const { mensdata } = require("../data/producdata");
const { womensdata } = require("../data/womensdata");
const { kidsdata } = require("../data/kids");
let { db } = require("../models/index");
const { Op, Sequelize } = require("sequelize");
let adddata = async (request, response) => {
  try {
    let categories = [
      { title: "mens" },
      { title: "womens" },
      { title: "kids" },
    ];
    await db.categories.bulkCreate(categories);
    await toaddbrands();
    await toaddsizes();
    let brands = await db.brands.findAll();
    let mensId = await db.categories.findOne({ where: { title: "mens" } });
    let Mensdata = mensdata.map((el) => {
      return {
        productName: el.productName,
        productimage: el.searchImage,
        description: el.additionalInfo,
        mrp: el.mrp,
        price: el.price,
        ratings: el.rating,
        ratingscount: el.ratingCount,
        discount: el.discount,
        discountLabel: el.discountLabel,
        discountDisplayLabel: el.discountDisplayLabel,
        discountInpercentage: el.discountDisplayLabel,
        categoryId: mensId.id,
        brandId: brands.find((el1) => el1.name === el.brand).id,
        primaryColour: el.primaryColour,
      };
    });
    let wonesId = await db.categories.findOne({ where: { title: "womens" } });
    let WomensData = womensdata.map((el) => {
      return {
        productName: el.productName,
        productimage: el.searchImage,
        description: el.additionalInfo,
        mrp: el.mrp,
        price: el.price,
        ratings: el.rating,
        ratingscount: el.ratingCount,
        discount: el.discount,
        discountLabel: el.discountLabel,
        discountDisplayLabel: el.discountDisplayLabel,
        discountInpercentage: el.discountDisplayLabel,
        categoryId: wonesId.id,
        brandId: brands.find((el1) => el1.name === el.brand).id,
        primaryColour: el.primaryColour,
      };
    });
    let kidsId = await db.categories.findOne({ where: { title: "kids" } });
    let Kidsdata = kidsdata.map((el) => {
      return {
        productName: el.productName,
        productimage: el.searchImage,
        description: el.additionalInfo,
        mrp: el.mrp,
        price: el.price,
        ratings: el.rating,
        ratingscount: el.ratingCount,
        discount: el.discount,
        discountLabel: el.discountLabel,
        discountDisplayLabel: el.discountDisplayLabel,
        discountInpercentage: el.discountDisplayLabel,
        categoryId: kidsId.id,
        brandId: brands.find((el1) => el1.name === el.brand).id,
        primaryColour: el.primaryColour,
      };
    });

    await db.products.bulkCreate([...Mensdata, ...WomensData, ...Kidsdata]);

    await toaddimages([...mensdata, ...womensdata, ...kidsdata]);
    await toaddproductdetails();
    let products = await db.products.findAll();
    return response.response(products);
  } catch (err) {
    console.log(err);
    return response.response(err);
  }
};

let toaddproductdetails = async () => {
  let data = [
    {
      size: "S",
    },
    {
      size: "M",
    },
    {
      size: "L",
    },
    {
      size: "XL",
    },
    {
      size: "XXL",
    },
  ];
  let data1 = [];
  let sizes = await db.sizes.findAll();
  let products = await db.products.findAll();
  for (let i = 0; i < products.length; i++) {
    for (let j = 0; j < sizes.length; j++) {
      data1.push({ productId: products[i].id, sizeId: sizes[j].id });
    }
  }
  await db.productDetails.bulkCreate(data1);
};

let toaddsizes = async () => {
  let data = [
    {
      size: "S",
    },
    {
      size: "M",
    },
    {
      size: "L",
    },
    {
      size: "XL",
    },
    {
      size: "XXL",
    },
  ];
  await db.sizes.bulkCreate(data);
};

let toaddimages = async (data) => {
  let products = await db.products.findAll();
  let imagesdata = [];
  for (let i = 0; i < products.length; i++) {
    let imageColumn = data[i].images.map((el) => {
      return {
        imageUrl: el.src,
        ProductId: products[i].id,
      };
    });

    for (iteam of imageColumn) {
      imagesdata.push(iteam);
    }
  }
  await db.images.bulkCreate(imagesdata);
};

let toaddbrands = async () => {
  let uniquebrand = [
    // "Roadster",
    // "The indian Garage Co",
    // "Campus Sutra",
    // "WROGN",
  ];
  let requiredbrand = [];
  let mbrands = mensdata.map((el) => {
    if (!requiredbrand.includes(el.brand)) {
      requiredbrand.push(el.brand);
    }
    return el;
  });
  let nbrands = womensdata.map((el) => {
    if (!requiredbrand.includes(el.brand)) {
      requiredbrand.push(el.brand);
    }
    return el;
  });

  let kbrands = kidsdata.map((el) => {
    if (!requiredbrand.includes(el.brand)) {
      requiredbrand.push(el.brand);
    }
    return el;
  });
  let fbrands = requiredbrand.map((el) => {
    return { name: el };
  });
  await db.brands.bulkCreate(fbrands);
};
module.exports = { adddata };
