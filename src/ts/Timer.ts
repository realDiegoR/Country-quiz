import { timer } from "./nodes";

export class Timer {
	_secondsLeft: number;
	_interval: number;

	constructor() {
		this._secondsLeft = 15;
		this._interval = 0;
	}

	start(callback: (arg: string) => void): void {
		this.reset();
		this._interval = setInterval(() => {
			this._secondsLeft--;
			timer.innerText = this._secondsLeft.toString();
			if (this._secondsLeft === 0) {
				this.stop();
				callback("Time's Up!");
			}
		}, 1000);
	}

	stop(): void {
		if (this._interval) clearInterval(this._interval);
	}

	reset(): void {
		this.stop();
		this._secondsLeft = 15;
		timer.innerText = this._secondsLeft.toString();
	}
}
