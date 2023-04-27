import {
	startBox,
	questionText,
	answersContainer,
	answersNodes,
	flagImage,
	nextButton,
	resultBox,
	resultsTitle,
	resultsText,
	checkIcon,
	xIcon,
	quizBox,
	tryAgainButton,
} from "./nodes";
import { Question } from "./Question";
import { ScoreCount } from "./ScoreCount";
import { Timer } from "./Timer";

export class Game {
	question: Question;
	scoreCount: ScoreCount;
	timer: Timer;

	constructor(question: Question, scoreCount: ScoreCount, timer: Timer) {
		this.question = question;
		this.scoreCount = scoreCount;
		this.timer = timer;
		this.paintResults = this.paintResults.bind(this);
		this.addEventListeners();
		this.paintResetQuizbox();
	}

	paintStartScreen() {
		startBox.classList.remove("hidden");
		quizBox.classList.add("hidden");
		resultBox.classList.add("hidden");
		this.timer.reset();
	}

	paintResetQuizbox() {
		startBox.classList.add("hidden");
		answersNodes.forEach((node) => {
			node.classList.remove("Correct", "Wrong");
		});
		answersContainer.classList.remove("pointer-events-none");
		quizBox.classList.remove("hidden");
		resultBox.classList.add("hidden");
		flagImage.classList.add("hidden");
		nextButton.classList.add("hidden");
		this.paintQuestion();
		this.timer.start(this.paintResults);
	}

	paintResults(title: string) {
		quizBox.classList.add("hidden");
		resultBox.classList.remove("hidden");
		resultsTitle.innerText = title;
		resultsText.innerHTML = `You got <span class="text-green-600 text-xl">${this.scoreCount.get()}</span> correct answers.`;
	}

	paintAnswerClick(element: HTMLElement, type: "correct" | "wrong") {
		if (type === "correct") {
			element.classList.add("Correct");
			element.appendChild(checkIcon);
			return;
		}
		element.classList.add("Wrong");
		element.appendChild(xIcon);
		const correctAnswer = answersNodes.find(
			(node) =>
				node.innerHTML == this.question.country.name.common ||
				node.innerHTML == this.question.country.capital[0]
		) as HTMLElement;
		correctAnswer.classList.add("Correct");
		correctAnswer.appendChild(checkIcon);
	}

	paintQuestion() {
		questionText.innerText = this.question.title;
		if (this.question.type === "flag") {
			flagImage.src = this.question.country.flags.png;
			flagImage.classList.replace("hidden", "block");
		}
		if (this.question.type === "flag" || this.question.type === "country") {
			answersNodes.forEach((item, index) => {
				item.innerHTML = this.question.answers[index].name.common;
			});
		}
		if (this.question.type === "capital") {
			answersNodes.forEach((item, index) => {
				item.innerHTML = this.question.answers[index].capital[0];
			});
		}
	}

	addEventListeners() {
		const controller = new AbortController();
		answersContainer.addEventListener(
			"click",
			(ev) => {
				const target = ev.target as HTMLElement;
				if (target === answersContainer) return;
				this.timer.stop();
				answersContainer.classList.add("pointer-events-none");
				const isCorrect = this.question.check(target);
				if (isCorrect) {
					this.paintAnswerClick(target, "correct");
					nextButton.classList.remove("hidden");
				} else {
					this.paintAnswerClick(target, "wrong");
					setTimeout(() => {
						this.paintResults("Game Over");
					}, 2500);
				}
				isCorrect && this.scoreCount.sum();
			},
			{
				signal: controller.signal,
			}
		);
		nextButton.addEventListener(
			"click",
			() => {
				this.question.makeNewQuestion();
				this.paintResetQuizbox();
			},
			{
				signal: controller.signal,
			}
		);
		tryAgainButton.addEventListener(
			"click",
			() => {
				controller.abort();
				this.paintStartScreen();
			},
			{
				once: true,
			}
		);
	}
}
