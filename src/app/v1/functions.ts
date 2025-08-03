import allAnswers, {
	negativeAnswers,
	neutralAnswers,
	positiveAnswers
} from "@/data/answers";
import { answersArray, answerTypes, Err } from "@/data/types";

/**
 *
 * @param {answersArray} answerArray Source array to receive.
 * @param {number} num Amount of items to receive from the source array.
 * @returns {answersArray} Array of answers with specified amount.
 */
function getAllAnswers(answerArray: answersArray, num: number): answersArray {
	if (num === 0 || !num) return answerArray;
	else {
		const shuffled: answersArray = answerArray.slice();

		if (num > answerArray.length)
			throw new RangeError(
				`Requested number of elements exceeds array length (length: ${answerArray.length})`
			);

		for (let i: number = shuffled.length - 1; i > 0; i--) {
			const j: number = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}

		return shuffled.slice(0, num);
	}
}

/**
 *
 * @param {string} type Specify answer type to receive.
 * @param {number} number Amount of objects to receive from the specified type.
 * @returns {answersArray} Array of answers with specified amount.
 */
export function getTypeAnswers(type: string, number: number): answersArray {
	switch (type) {
		case answerTypes.positive:
			return getAllAnswers(positiveAnswers, number);
		case answerTypes.neutral:
			return getAllAnswers(neutralAnswers, number);
		case answerTypes.negative:
			return getAllAnswers(negativeAnswers, number);
		case answerTypes.all:
			return getAllAnswers(allAnswers, number);
		default:
			throw new Err({
				type: "REQ_ERR",
				message:
					"Invalid type specified, choose 'positive', 'negative', 'neutral' or 'all'",
				cause: "getTypeAnswers() on /app/allAnswers/route.ts"
			});
	}
}
