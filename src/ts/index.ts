import { Game } from "./Game";
import { Data } from "./Data";
import { Question } from "./Question";
import { ScoreCount } from "./ScoreCount";
import { Timer } from "./Timer";

const startGame = async (regions: string[]) => {
	const data = new Data(regions);
	await data.fetch();
	if (!data.countries) return;
	const question = new Question(data.countries);
	const scoreCount = new ScoreCount();
	const timer = new Timer();
	const game = new Game(data, question, scoreCount, timer, startGame);
};

startGame(["america"]);
