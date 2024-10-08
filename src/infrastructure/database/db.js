const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.MYSQLDB_HOST,
  user: process.env.MYSQLDB_USER,
  database: process.env.MYSQLDB_DATABASE,
  password: process.env.MYSQLDB_ROOT_PASSWORD,
});
module.exports = db.promise();
