const Pool = require("pg").Pool;
const pool = new Pool({
	user: process.env.USERDB,
	password: process.env.PASSWORDDB,
	host: process.env.HOSTDB,
	port: process.env.PORTBD,
	database: process.env.DATABASE,
});

module.exports = pool;
