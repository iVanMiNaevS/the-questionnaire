const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

const answers = [];

app.get("/api/data", (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.json(answers);
});

app.post("/api/data", (req, res) => {
	console.log(req.body);
	answers.push(req.body);
	res.json(answers);
});

app.listen(PORT, () => {
	console.log("SERVER WORK ON " + PORT);
});
