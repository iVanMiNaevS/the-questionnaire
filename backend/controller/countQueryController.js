const db = require("../db");

class CountQueryController {
	async updateCountQuery(count) {
		try {
			const count = await db.query(
				"UPDATE countquery set count = $1 RETURNiNG *",
				[count]
			);
			console.log("update cq");
		} catch (err) {
			console.log(err);
		}
	}
	async createCountQuery(count) {
		try {
			const countdb = await db.query(
				"INSERT INTO countquery (count) values ($1) RETURNING *",
				[count]
			);
			console.log(countdb.rows[0]);
		} catch (err) {
			console.log(err);
		}
	}
	async getCountQuery() {
		try {
			const count = await db.query("SELECT * FROM countquery");
			return count.rows[0];
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = new CountQueryController();
