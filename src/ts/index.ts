import { startGameButton, regions } from "./nodes";
import { isEqualArray } from "./utils/isEqualArray";
import { Game } from "./Game";
import { Countries, Country } from "./Countries";
import { Question } from "./Question";
import { ScoreCount } from "./ScoreCount";
import { Timer } from "./Timer";

const startGame = async (regions: string[]) => {
	const countries = new Countries(regions);
	if (isEqualArray(regions, countries.previousRegions))
		countries.data = countries.loadArray<Country>("data");
	else await countries.fetch();
	if (!countries.data) return;
	const question = new Question(countries.data);
	const scoreCount = new ScoreCount();
	const timer = new Timer();
	const game = new Game(question, scoreCount, timer);
};

startGameButton.addEventListener("click", () => {
	const selectedRegions = regions.filter((region) => region.checked);
	if (!selectedRegions) return;
	const regionNames = selectedRegions.map((region) => {
		const label = region.nextElementSibling as HTMLElement;
		return label.innerText;
	});
	startGame(regionNames);
	selectedRegions.forEach((region) => (region.checked = false));
});
