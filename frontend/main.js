const bt = document.querySelector(".send");

const question = document.querySelector(".questions");
const countQue = question.querySelectorAll("li").length;
const data = { ans: {} };

question.addEventListener("click", (e) => {
	let target = e.target;

	if (target.classList.contains("labelQue")) {
		const que = target.id.split("-")[1];
		const answer = target.id.split("-")[2];
		data.ans[que] = answer;
		console.log(data);
	}
});

async function postAnswers() {
	try {
		let response = await fetch("http://localhost:3000/api/data", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		let result = await response.json();
		console.log(result);
	} catch (err) {
		console.log(err);
	}
}

async function getData() {
	try {
		const response = await fetch("http://localhost:3000/api/data");
		const data = await response.json();
		console.log(data);
	} catch (err) {
		console.log(err);
	}
}

bt.addEventListener("click", async () => {
	if (Object.keys(data.ans).length !== countQue) {
		document.querySelector("span").innerText = "Ответье на все вопросы";
		bt.classList.add("red");
	} else {
		document.querySelector("span").innerText = "";
		bt.classList.remove("red");
		postAnswers();
	}
});
