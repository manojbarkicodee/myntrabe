const { adddata } = require("./adddummydata");

let Routes = [
  {
    method: "Get",
    path: "/adddata",
    handler: adddata,
    config: {
      auth: false,
    },
  },
];

module.exports = { Routes };
