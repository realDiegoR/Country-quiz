export const isEqualArray = (
	arr1: Array<string>,
	arr2: Array<string>
): boolean => {
	return arr1.join() === arr2.join();
};
