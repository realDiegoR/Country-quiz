import { random } from "./utils/random";

export interface Country {
	name: {
		common: string;
	};
	capital: string[];
	flags: {
		alt: string;
		png: string;
		svg: string;
	};
	subregion: string;
}

export class Data {
	countries: Country[] | null;
	regions: string[];

	constructor(regions: string[]) {
		this.regions = regions;
		this.countries = null;
	}

	async fetch(): Promise<Country[] | null> {
		const API = `https://restcountries.com/v3.1/region/${
			this.regions[random(0, this.regions.length - 1)]
		}?fields=name,capital,flags,subregion`;
		try {
			const response = await fetch(API);
			const data = await response.json();
			this.countries = data;
			return data;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}
