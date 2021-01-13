// use library and configure to connect to database
const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres", // Change to what user you used to connect to knit2 database
    password: "vickilu88", // Can comment this out
    host: "localhost",
    port: 5432,
    database: "knit2"
});

module.exports = pool;