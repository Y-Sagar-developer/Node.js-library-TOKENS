const mysql = require("mysql2");
require("dotenv").config();
// console.log(process.env.DB_PASSWORD)

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err, res) => {
  err ? console.log(err) : console.log("database connected");
});


module.exports=connection