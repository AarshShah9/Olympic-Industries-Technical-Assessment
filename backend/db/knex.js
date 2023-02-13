const knex = require("knex");
const connnectedKnex = knex({
  client: "sqlite3",
  connection: {
    filename: "LumberDatabase.sqlite",
  },
});

module.exports = connnectedKnex;
