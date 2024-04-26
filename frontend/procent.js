const procents = document.querySelectorAll(".procent");
const progress = document.querySelectorAll(".proggres");

function identifyAndInstall(el, answers, resolve, reject) {
	const que = Number(el.id.split("-")[1]);
	const answer = Number(el.id.split("-")[2]);
	const procent = answers.find(
		(answer1) => answer1.que_id === que && answer1.name === answer
	);
	if (procent === undefined) {
		reject(el);
	} else {
		resolve(el, procent);
	}
}

window.addEventListener("load", async () => {
	try {
		const response = await fetch("http://localhost:3000/api/procents");
		const data = await response.json();
		procents.forEach((el) => {
			identifyAndInstall(
				el,
				data,
				(el, procent) => {
					el.innerHTML = procent.procent + "%";
				},
				(el) => {
					el.innerHTML = "0%";
				}
			);
		});
		progress.forEach((el) => {
			identifyAndInstall(
				el,
				data,
				(el, procent) => {
					el.style.width = procent.procent + "%";
				},
				(el) => {
					el.style.width = "0%";
				}
			);
		});
	} catch (err) {
		console.log(err);
	}
});
