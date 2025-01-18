const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost', // Replace with your MySQL host
    user: 'root',      // Replace with your MySQL username
    password: 'baseddb1079',      // Replace with your MySQL password
    database: 'discord_bot', // Replace with your database name
});

module.exports = pool;
