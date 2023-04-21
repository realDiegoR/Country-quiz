const checkSVG = new URL("../assets/svg/check.svg", import.meta.url).href;
const crossSVG = new URL("../assets/svg/cross.svg", import.meta.url).href;

/* HTMLElements */
export const startBox = document.getElementById("start-box") as HTMLElement;
export const startGameButton = document.getElementById(
	"start-game"
) as HTMLElement;
export const regions = [
	...document.querySelectorAll("input[type='checkbox']"),
] as HTMLInputElement[];
export const quizBox = document.getElementById("quizbox") as HTMLElement;
export const questionText = document.getElementById("question") as HTMLElement;
export const answersContainer = document.getElementById(
	"answer-options"
) as HTMLElement;
export const answersNodes = [...answersContainer.children];
export const flagImage = document.getElementById(
	"flagImage"
) as HTMLImageElement;
export const nextButton = document.getElementById("next") as HTMLElement;
export const resultBox = document.getElementById("results") as HTMLElement;
export const resultsTitle = document.getElementById(
	"resultsTitle"
) as HTMLElement;
export const resultsText = document.getElementById(
	"resultsCount"
) as HTMLElement;
export const tryAgainButton = document.getElementById(
	"try-again"
) as HTMLElement;
export const timer = document.getElementById("timer") as HTMLElement;

/* SVGs */
export const checkIcon = new Image();
checkIcon.src = checkSVG;
checkIcon.classList.add("absolute", "top-0", "right-2", "bottom-0", "my-auto");
export const xIcon = new Image();
xIcon.src = crossSVG;
xIcon.classList.add("absolute", "right-2", "top-0", "bottom-0", "my-auto");
