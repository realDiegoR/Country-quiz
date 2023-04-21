import { Game } from "./Game";
import { Data } from "./Data";
import { Question } from "./Question";
import { ScoreCount } from "./ScoreCount";
import { Timer } from "./Timer";
import { startGameButton, regions } from "./nodes";

const startGame = async (regions: string[]) => {
	const data = new Data(regions);
	await data.fetch();
	if (!data.countries) return;
	const question = new Question(data.countries);
	const scoreCount = new ScoreCount();
	const timer = new Timer();
	const game = new Game(data, question, scoreCount, timer);
};

startGameButton.addEventListener("click", (ev) => {
	const selectedRegions = regions.filter((region) => region.checked);
	if (!selectedRegions) return;
	const regionNames = selectedRegions.map((region) => {
		const label = region.nextElementSibling as HTMLElement;
		return label.innerText;
	});
	startGame(regionNames);
	selectedRegions.forEach((region) => (region.checked = false));
});
