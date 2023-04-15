const questionText = document.getElementById("question");
const options = [...document.getElementById("answer-options").children];
const image = document.getElementById("image");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next");
const resultBox = document.getElementById("results");
const resultTitle = document.getElementById("results-title");
const resultText = document.getElementById("results-count");
const timer = document.getElementById("timer");
const checkIcon = new Image();
checkIcon.src = "./country-quiz-master/outline_check_black_24dp.png";
checkIcon.classList.add("icon");
const xIcon = new Image();
xIcon.src = "./country-quiz-master/outline_close_black_24dp.png";
xIcon.classList.add("icon");
let interval;
let answerIsCorrect;
const regions = ["america", "europe"];

function startCount() {
	let correctCount = 0;
	return function (type) {
		if (type == 1) {
			return correctCount++;
		} else {
			return (correctCount = 0);
		}
	};
}
const correctAnswersCount = startCount();

image.onload = (ev) => {
	ev.target.classList.remove("invisible");
};

startQuestion();

function startQuestion() {
	timer.innerHTML = "15 sec";

	if (interval) clearInterval(interval);

	const question = random(0, 2);

	fetch(
		`https://restcountries.com/v3.1/region/${
			regions[random(0, 1)]
		}?fields=name,capital,flags,subregion`
	)
		.then((countriesData) => {
			console.log(countriesData.ok);
			if (countriesData.ok) {
				return countriesData.json();
			} else {
				setTimeout(function () {
					console.log(222);
					startQuestion();
				}, 5000);
				return false;
			}
		})
		.then((countriesData) => {
			options.forEach((item) => {
				item.classList.remove("correct", "wrong");
			});
			resultBox.style.display = "none";
			quizbox.style.display = "block";
			image.style.display = "none";
			nextButton.classList.remove("show");

			let sec = 15;
			interval = setInterval(() => {
				timer.innerHTML = `${--sec} sec`;
				if (sec == 0) {
					clearInterval(interval);
					getResults("Time's out!");
				}
			}, 1000);

			const selectedCountry =
				countriesData[random(0, countriesData.length - 1)];

			elaborateQuestion(countriesData, selectedCountry, 2);

			answerIsCorrect = (function () {
				//this closure prevents smarties from getting data about the question from a global variable
				//i dont think anybody would do that but, idk
				type = question;
				country = selectedCountry;
				return function (ev) {
					const clickedAnswerText = ev.target.innerText;
					if (type == 0 || type == 2) {
						clickedAnswerText == selectedCountry.name.common
							? markAsCorrectAnswer(ev)
							: markAsWrongAnswer(ev, selectedCountry.name.common);
					}
					if (type == 1) {
						clickedAnswerText == selectedCountry.capital
							? markAsCorrectAnswer(ev)
							: markAsWrongAnswer(ev, selectedCountry.capital);
					}
					return Boolean(ev.target.classList.contains("correct"));
				};
			})();
		})
		.catch((error) => console.log(error));
}

function elaborateQuestion(allCountries, selectedCountry, type) {
	const possibleAnswers = allCountries.filter((country) => {
		if (country.name.common === selectedCountry.name.common) return false;

		return country.subregion === selectedCountry.subregion;
	});

	while (possibleAnswers.length > 3) {
		possibleAnswers.splice(random(0, possibleAnswers.length), 1);
	}

	possibleAnswers.splice(random(0, 3), 0, selectedCountry);

	if (type === 0) {
		const text = `${selectedCountry.capital} is the Capital of...`;
		questionText.innerHTML = text;

		options.forEach((item, index) => {
			item.innerHTML = possibleAnswers[index].name.common;
		});
	} else if (type === 1) {
		const text = `The Capital of ${selectedCountry.name.common} is...`;
		questionText.innerHTML = text;

		options.forEach((item, index) => {
			item.innerHTML = possibleAnswers[index].capital;
		});
	} else if (type === 2) {
		image.src = selectedCountry.flags.png;
		image.style.display = "block";

		const text = "Which country does this flag belong to..?";
		questionText.innerHTML = text;

		options.forEach((item, index) => {
			item.innerHTML = possibleAnswers[index].name.common;
		});
	}
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function markAsCorrectAnswer(ev) {
	ev.target.classList.add("correct");
	ev.target.appendChild(checkIcon);
}

function markAsWrongAnswer(ev, goodAnswer) {
	ev.target.classList.add("wrong");
	ev.target.appendChild(xIcon);
	const correctAnswer = options.find((item) => item.innerText == goodAnswer);
	correctAnswer.classList.add("correct");
	correctAnswer.appendChild(checkIcon);
}

optionsContainer.addEventListener("mouseover", (ev) => {
	if (ev.target == optionsContainer) return false;
	ev.target.classList.add("mouseover");
});

optionsContainer.addEventListener("mouseout", (ev) => {
	if (ev.target == optionsContainer) return false;
	ev.target.classList.remove("mouseover");
});

optionsContainer.addEventListener("click", (ev) => {
	if (ev.target == optionsContainer) return false;

	clearInterval(interval);

	if (options.some((item) => item.classList.contains("correct"))) return false;

	const answerWasCorrect = answerIsCorrect(ev);

	if (answerWasCorrect) {
		nextButton.classList.add("show");
		correctAnswersCount(1);
	} else {
		setTimeout(getResults, 2500, "Results");
	}
});

function getResults(title) {
	quizbox.style.display = "none";
	resultBox.style.display = "block";
	resultTitle.innerHTML = title;
	resultText.innerHTML = `You got <span class="text-green-600 text-xl">${correctAnswersCount(
		1
	)}</span> correct answers.`;
	correctAnswersCount(0);
}
