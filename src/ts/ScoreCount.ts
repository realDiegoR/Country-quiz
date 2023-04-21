export class ScoreCount {
	_correctCount: number;

	constructor() {
		this._correctCount = 0;
	}

	sum(): number {
		return (this._correctCount += 1);
	}
	get(): number {
		return this._correctCount;
	}
}
