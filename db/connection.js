const mysql2 = require('mysql2');

const connection = mysql2.createConnection({
    database: 'events',
    host: 'localhost',
    port: '3306',
    user: 'dbap',
    password: '1234',
});

module.exports = connection;