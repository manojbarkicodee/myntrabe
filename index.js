require("dotenv").config();
const happi = require("@hapi/hapi");
const { sequelize } = require("./db/database");
const { Routes } = require("./controllers");
const Jwt = require("hapi-auth-jwt2");
const { validate } = require("./controllers/authController");
const { productsRoutes } = require("./routes/productsRoutes");
const { authRoutes } = require("./routes/authRoutes");
const { cartRoutes } = require("./routes/cartRoutes");
const { wishlistRoutes } = require("./routes/wishlistRoutes");
const { userRoutes } = require("./routes/userRoutes");
const { paymentRoutes } = require("./routes/paymentRoute");
const { ordersRoutes } = require("./routes/ordersRoute");
const { db } = require("./models");
const jwtKey = process.env.jwtKey;
const jwtAlgorithm = process.env.jwtAlgorithm;

const server = happi.server({
  port: process.env.PORT || 8000,
  host: "localhost",

  routes: { cors: { origin: ["*"] } },
});

sequelize
  .authenticate()
  .then((res) => {
    console.log("connected with database");
  })
  .catch((error) => {
    console.log(error);
  });

// db.sequelize.sync({alter:true}).then(()=>{
//   console.log("TABLES CREATED")
// }).catch((err)=>{
//   console.log(err)
// })
server.route(Routes);
server.route(productsRoutes);
server.route(authRoutes);
server.route(cartRoutes);
server.route(wishlistRoutes);
server.route(userRoutes);
server.route(paymentRoutes);
server.route(ordersRoutes);

let init = async () => {
  await server.start();

  await server.register(Jwt);

  server.auth.strategy("jwt", "jwt", {
    key: jwtKey,
    validate,
    verifyOptions: {
      algorithm: jwtAlgorithm,
    },
  });

  server.auth.default("jwt");
};

init();
