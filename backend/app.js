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
async function updateOtherAnswer(answer, que, countQuery) {
	const otherAnswer = await answerController.getOtherAnswerProcent(answer, que);
	console.log(otherAnswer);
	if (otherAnswer !== undefined) {
		otherAnswer.forEach(async (answer) => {
			const currentCount = await answerController.getCountAnswer(
				answer.name,
				answer.que_id
			);
			const proc = calcPerc(countQuery + 1, currentCount);
			console.log(proc);
			answerController.updateProcentAnswer(proc, answer.name, answer.que_id);
		});
	}
}
const answerController = require("../backend/controller/answerController");
const countQueryController = require("../backend/controller/countQueryController");

app.post("/api/data", async (req, res) => {
	const countQuery = await countQueryController.getCountQuery();
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
			answerController.createAnswer(
				{ name: answer, que_id: que },
				calcPerc(countQuery === undefined ? 1 : countQuery + 1, 1)
			);
			updateOtherAnswer(answer, que, countQuery);
		} else {
			answerController.getCountAnswer(answer, que).then((currentCount) => {
				answerController.updateAnswerCount(currentCount + 1, answer, que);
				console.log("cq " + countQuery + " " + "CC " + currentCount);
				const proc = calcPerc(countQuery + 1, currentCount + 1);
				console.log(proc);
				answerController.updateProcentAnswer(proc, answer, que);
			});
			updateOtherAnswer(answer, que, countQuery);
		}
	});

	const allAnswers = await answerController.getAnswers();
	res.json(allAnswers);
});

app.get("/api/procents", async (req, res) => {
	const answers = await answerController.getAnswers();
	res.json(answers);
});

app.listen(PORT, () => {
	console.log("SERVER WORK ON " + PORT);
});
