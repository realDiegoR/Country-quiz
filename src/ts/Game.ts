import {
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
import { Data } from "./Data";
import { Question } from "./Question";
import { ScoreCount } from "./ScoreCount";
import { Timer } from "./Timer";

export class Game {
	data: Data;
	question: Question;
	scoreCount: ScoreCount;
	timer: Timer;
	restartGame: (regions: string[]) => void;

	constructor(
		data: Data,
		question: Question,
		scoreCount: ScoreCount,
		timer: Timer,
		restartGame: (regions: string[]) => void
	) {
		this.data = data;
		this.question = question;
		this.scoreCount = scoreCount;
		this.timer = timer;
		this.restartGame = restartGame;
		this.addEventListeners();
		this.printResults = this.printResults.bind(this);
		this.updateScreen();
	}

	updateScreen() {
		this.printReset();
		this.printQuestion();
	}

	printReset() {
		answersNodes.forEach((node) => {
			node.classList.remove("Correct", "Wrong");
		});
		answersContainer.classList.remove("pointer-events-none");
		quizBox.classList.remove("hidden");
		resultBox.classList.add("hidden");
		flagImage.classList.add("hidden");
		nextButton.classList.add("hidden");
		this.timer.start(this.printResults);
	}

	printResults(title: string) {
		quizBox.classList.add("hidden");
		resultBox.classList.remove("hidden");
		resultsTitle.innerText = title;
		resultsText.innerHTML = `You got <span class="text-green-600 text-xl">${this.scoreCount.get()}</span> correct answers.`;
	}

	printAnswerClick(element: HTMLElement, type: "correct" | "wrong") {
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

	printQuestion() {
		questionText.innerText = this.question.title;
		if (this.question.type === 0) {
			answersNodes.forEach((item, index) => {
				item.innerHTML = this.question.answers[index].name.common;
			});
		} else if (this.question.type === 1) {
			answersNodes.forEach((item, index) => {
				item.innerHTML = this.question.answers[index].capital[0];
			});
		} else if (this.question.type === 2) {
			flagImage.src = this.question.country.flags.png;
			flagImage.classList.replace("hidden", "block");
			answersNodes.forEach((item, index) => {
				item.innerHTML = this.question.answers[index].name.common;
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
					this.printAnswerClick(target, "correct");
					nextButton.classList.remove("hidden");
				} else {
					this.printAnswerClick(target, "wrong");
					setTimeout(() => {
						this.printResults("Game Over");
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
			(ev) => {
				this.question.makeNewQuestion();
				this.updateScreen();
			},
			{
				signal: controller.signal,
			}
		);
		tryAgainButton.addEventListener(
			"click",
			(ev) => {
				controller.abort();
				this.restartGame(["america"]);
			},
			{
				once: true,
			}
		);
	}
}
