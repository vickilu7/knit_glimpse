// use library and configure to connect to database
const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "vickilu88",
    host: "localhost",
    port: 5432,
    database: "knit2"
});

module.exports = pool;