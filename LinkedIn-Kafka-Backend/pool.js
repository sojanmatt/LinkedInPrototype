var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100,
    host: "linkedinteam1.c4redet1j4es.us-west-1.rds.amazonaws.com",
    user: "linkedin",
    password: "linkedin",
    database: "linkedin"
  });

  module.exports = pool;
  