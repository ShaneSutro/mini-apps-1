const mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'student',
  password: 'student',
  database: 'checkout'
});

connection.connect();

module.exports = connection;
