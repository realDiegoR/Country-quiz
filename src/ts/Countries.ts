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

export class Countries {
	data: Country[] | null;
	regions: string[];
	previousRegions: string[];

	constructor(regions: string[]) {
		this.regions = regions;
		this.data = null;
		this.previousRegions = this.loadArray("previousRegions") || [];
	}

	saveArray(name: string, array: string[]): void {
		const stringfiedArray = JSON.stringify(array);
		sessionStorage.setItem(name, stringfiedArray);
	}

	loadArray<T>(name: string): Array<T> | null {
		const stringfiedArray = sessionStorage.getItem(name);
		if (!stringfiedArray) return null;
		const parsedArray = JSON.parse(stringfiedArray);
		return parsedArray as Array<T>;
	}

	async fetch(): Promise<void> {
		const API = `https://restcountries.com/v3.1/region/${
			this.regions[random(0, this.regions.length - 1)]
		}?fields=name,capital,flags,subregion`;
		console.log("fetched");
		try {
			const response = await fetch(API);
			const data = await response.json();
			this.data = data;
			this.saveArray("previousRegions", this.regions);
			this.saveArray("data", data);
		} catch (error) {
			console.error(error);
		}
	}
}
