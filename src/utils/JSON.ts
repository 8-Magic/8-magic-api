/**
 * @description Preferred options used for `JSON.stringify()`
 */
export const defaultSettings: {
	replacer: (number | string)[] | null;
	space: string | number;
} = {
	replacer: null,
	space: 4
};

/**
 * Stringifies the specified object. Used with default settings.
 *
 * You can override default options by passing them as parameter after the object.
 */
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
