import { Country } from "./Data";
import { random } from "./utils/random";

export class Question {
	type: 0 | 1 | 2;
	data: Country[];
	country: Country;
	answers: Country[];
	title: string;

	constructor(data: Country[]) {
		this.data = data;
		this.country = this.selectCountry(this.data);
		this.answers = this.makeAnswers(this.country, this.data);
		this.type = random(0, 2);
		this.title = this.makeQuestionTitle(this.country, this.type);
	}

	selectCountry(countries: Country[]): Country {
		return countries[random(0, countries.length - 1)];
	}

	makeQuestionTitle(country: Country, type: number): string {
		if (type === 0) {
			return `${this.country.capital[0]} is the Capital of...`;
		} else if (type === 1) {
			return `The Capital of ${this.country.name.common} is...`;
		}
		return "Which country does this flag belong to..?";
	}

	makeAnswers(selectedCountry: Country, countries: Country[]): Country[] {
		const answers = countries.filter((country: Country) => {
			if (country.name.common === selectedCountry.name.common) return false;
			return country.subregion === selectedCountry.subregion;
		});

		while (answers.length > 3) {
			answers.splice(random(0, answers.length), 1);
		}
		answers.splice(random(0, 3), 0, selectedCountry);
		return answers;
	}

	makeNewQuestion() {
		this.country = this.selectCountry(this.data);
		this.answers = this.makeAnswers(this.country, this.data);
		this.title = this.makeQuestionTitle(this.country, this.type);
	}

	check(element: HTMLElement) {
		const clickedText = element.innerText;
		if (this.type === 0 || this.type === 2) {
			const isCorrect = clickedText === this.country.name.common;
			return isCorrect;
		}
		const isCorrect = clickedText === this.country.capital[0];
		return isCorrect;
	}
}
