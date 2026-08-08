const mysql = require("mysql2");

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdleTime: 10,
    idleTimeout: 60000,
    queueLimit: 0
});

module.exports = pool;