const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'dkkhoa',
  password: 'dkkhoa123',
  database: 'computer_management',
  waitForConnections: true,
  connectionLimit: 10,
  
});

module.exports = pool;