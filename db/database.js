const Sequelize = require("sequelize");
const database = process.env.database;
const username = process.env.username;
const password = process.env.password;
const sequelize = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "mysql",
});

module.exports = { sequelize };
