const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
function calcPerc(all, count) {
	return Math.round((count * 100) / all);
}

const answerController = require("../backend/controller/answerController");
const countQueryController = require("../backend/controller/countQueryController");

app.post("/api/data", async (req, res) => {
	const countQuery = await countQueryController.getCountQuery();
	console.log("cq " + countQuery);
	if (countQuery === undefined) {
		countQueryController.createCountQuery(1);
	} else {
		countQueryController.updateCountQuery(countQuery + 1);
	}
	const answers = req.body;
	Object.keys(answers).forEach(async (que) => {
		const answer = answers[que];
		const answerFromdb = await answerController.getOneAnswer(que, answer);
		// console.log(answerFromdb);
		if (answerFromdb === undefined) {
			console.log("if");
			answerController.createAnswer({ name: answer, que_id: que });
		} else {
			console.log("else");
			answerController
				.getCountAnswer(answer, que)
				.then((currentCount) =>
					answerController.updateAnswerCount(currentCount + 1, answer, que)
				);
		}
	});

	const allAnswers = await answerController.getAnswers();
	res.json(allAnswers);
});

app.listen(PORT, () => {
	console.log("SERVER WORK ON " + PORT);
});
