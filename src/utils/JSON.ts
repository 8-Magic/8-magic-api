export const defaultSettings: {
	replacer: (number | string)[] | null;
	space: string | number;
} = {
	replacer: null,
	space: 4
};

export default function JSONstring(
	inputObject: object,
	replacer?: (number | string)[] | null,
	space?: string | number
): string {
	return JSON.stringify(
		inputObject,
		replacer || defaultSettings.replacer,
		space || defaultSettings.space
	);
}
