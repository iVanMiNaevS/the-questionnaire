const questions = document.querySelectorAll(".que");

const options = {
	root: null,
	rootMargin: "0px",
	threshold: 0,
};

// создаем наблюдатель
const observer = new IntersectionObserver((entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			const que = entry.target;
			que.classList.add("view");
		} else {
			const que = entry.target;
			que.classList.remove("view");
		}
	});
}, options);

questions.forEach((que) => {
	observer.observe(que);
});
