export const random = (min: number, max: number): 0 | 1 | 2 => {
	return Math.floor(Math.random() * (max - min + 1) + min) as 0 | 1 | 2;
};
