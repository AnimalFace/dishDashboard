const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "dishdashboard",
  password: "password",
  port: 5432
});

client.connect()
  .then(() => console.log('Connected'))
  .catch((err) => console.log(err));

module.exports = client;
