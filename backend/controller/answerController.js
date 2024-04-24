const db = require("../db");

class AnswerController {
	async getAnswers() {
		try {
			const answers = await db.query("SELECT * FROM answer");
			return answers.rows;
		} catch (err) {
			console.log(err);
		}
	}
	async createAnswer(col) {
		const { name, que_id } = col;
		try {
			const newAnswer = await db.query(
				"INSERT INTO answer (name, que_id, count, procent) values ($1, $2, 0, 0) RETURNING *",
				[name, que_id]
			);
			// console.log(newAnswer.rows[0]);
		} catch (err) {
			console.log(err);
		}
	}
	async getOneAnswer(que, ans) {
		try {
			const answer = await db.query(
				"SELECT * FROM answer where name = $1 and que_id = $2",
				[ans, que]
			);
			return answer.rows[0];
		} catch (err) {
			console.log(err);
		}
	}

	async updateAnswerCount(count, name, que_id) {
		try {
			const answer = await db.query(
				"UPDATE answer set count = $1 where name = $2 and que_id = $3  RETURNiNG *",
				[count, name, que_id]
			);
			console.log("update");
		} catch (err) {
			console.log(err);
		}
	}

	async getCountAnswer(name, que_id) {
		try {
			const count = await db.query(
				"select count from answer where name = $1 and que_id = $2",
				[name, que_id]
			);
			return count.rows[0].count;
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = new AnswerController();
