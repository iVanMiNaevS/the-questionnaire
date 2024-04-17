const bt = document.querySelector(".send");
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
	getData();
});
