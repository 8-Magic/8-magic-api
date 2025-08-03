import { answerObject, answersArray, Err } from "./types";

/**
 * Used in answer objects as a reference for IDing.
 */
let id: number = 0;

/**
 * @returns {answersArray} An array of positive answer objects.
 */
export const positiveAnswers: answersArray = [
	"Without a doubt",
	"Yes, definitely",
	"You may rely on it",
	"As I see it, yes",
	"Most likely",
	"Signs point to yes",
	"It is certain"
].map((answer: string): answerObject => {
	return {
		id: ++id,
		answer: answer,
		type: "positive",
		emoji: "👍"
	};
});

/**
 * @returns {answersArray} An array of neutral answer objects.
 */
export const neutralAnswers: answersArray = [
	"Reply hazy, try again",
	"Ask again later",
	"Better not tell you now",
	"Cannot predict now",
	"Concentrate and ask again",
	"I'm not sure right now",
	"Maybe, IDK"
].map((answer: string): answerObject => {
	return {
		id: ++id,
		answer: answer,
		type: "neutral",
		emoji: "🤷"
	};
});

/**
 * @returns {answersArray} An array of negative answer objects.
 */
export const negativeAnswers: answersArray = [
	"Don't count on it",
	"My reply is no",
	"My sources say no",
	"Outlook not so good",
	"Very doubtful",
	"Don't think about it",
	"Not a chance"
].map((answer: string): answerObject => {
	return {
		id: ++id,
		answer: answer,
		type: "negative",
		emoji: "👎"
	};
});

/**
 * An array consisting of all answer objects.
 */
const allAnswers: answersArray = [
	...positiveAnswers,
	...neutralAnswers,
	...negativeAnswers
];

/**
 *
 * @param {string} type Specify answer type to receive array length.
 * @returns {number} Array length of specified answer type.
 */
export function getTypeLength(type: string): number {
	switch (type) {
		case "positive":
			return positiveAnswers.length;
		case "neutral":
			return neutralAnswers.length;
		case "negative":
			return negativeAnswers.length;
		case "all":
			return allAnswers.length;
		default:
			throw new Err({
				type: "SERV_ERR",
				message: "No type specified to calculate length",
				cause: "getTypeLength() on /src/data/answers.ts"
			});
	}
}

export default allAnswers;
