const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

const answers = [];
const countAns = {
	// 1: { 1: 0, 2: 0, 3: 0 },
	// 2: { 1: 0, 2: 0, 3: 0 },
	// 3: { 1: 0, 2: 0, 3: 0 },
	// 4: { 1: 0, 2: 0, 3: 0 },
	// 5: { 1: 0, 2: 0, 3: 0 },
};
const procents = {
	// 1: { 1: 100, 2: 30, 3: 40 },
};
app.get("/api/data", (req, res) => {
	res.json(answers);
});

function calcPerc(all, count) {
	return Math.round((count * 100) / all);
}

app.post("/api/data", (req, res) => {
	answers.push(req.body);
	const ans = req.body.ans;
	Object.keys(ans).forEach((que) => {
		const an = ans[que];
		if (countAns[que] == undefined) {
			countAns[que] = { [an]: 1 };
		} else {
			if (countAns[que][an] == undefined) {
				countAns[que][an] = 1;
			} else {
				countAns[que][an] += 1;
			}
		}
	});
	Object.keys(countAns).forEach((que) => {
		Object.keys(countAns[que]).forEach((an) => {
			const count = countAns[que][an];
			if (procents[que] === undefined) {
				procents[que] = { [an]: calcPerc(answers.length, count) };
			} else {
				procents[que][an] = calcPerc(answers.length, count);
			}
		});
	});
	res.json(answers);
});

app.get("/api/procents", (req, res) => {
	console.log(procents);
	res.json(procents);
});

app.listen(PORT, () => {
	console.log("SERVER WORK ON " + PORT);
});
