const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();

app.use(express.json());

const users = [
	{ id: 1, name: "ivan" },
	{ id: 2, name: "ivan2" },
];

app.get("/api/data", (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.json(users);
});

app.listen(PORT, () => {
	console.log("SERVER WORK ON " + PORT);
});
