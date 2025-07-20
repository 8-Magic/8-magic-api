import allAnswers, {
	negativeAnswers,
	neutralAnswers,
	positiveAnswers
} from "@/data/answers";
import { answerObject, Err } from "@/data/types";

/**
 * @param {Array} SrcArr Source array to select a random element from.
 *
 * @returns {unknown} Random element with the type of the elements of source array .
 */
export function randomElement(SrcArr: Array<unknown>): unknown {
	if (!SrcArr)
		throw new Err({
			type: "SERV_ERR",
			message: "No array specified to get a random element from.",
			cause: "randomElement() on /src/utils/randomAnswer.ts"
		});
	else return SrcArr[Math.floor(Math.random() * SrcArr.length)];
}

/**
 * @param {string} reqType (Default: all) Specifies the type of the random answer you'll get.
 *
 * @returns {answerObject} A random answer-object with the answer and type.
 *
 * @see `/src/data/answers.ts` for the list of answers.
 */
export function randomAnswer(reqType?: string): answerObject {
	switch (reqType) {
		case "positive":
			return randomElement(positiveAnswers) as answerObject;
		case "neutral":
			return randomElement(neutralAnswers) as answerObject;
		case "negative":
			return randomElement(negativeAnswers) as answerObject;
		case "all":
		default:
			return randomElement(allAnswers) as answerObject;
	}
}

/**
 *
 * @param {number | string} id Used to select the specified answer object with this `id`
 * @returns {answerObject} ID-specified answer object
 */
export function getAnswerByID(id: number | string): answerObject {
	if (typeof id === "string" && !isNaN(Number(id))) id = Number(id);
	if (!isNaN(Number(id)))
		return allAnswers.filter((answer) => answer.id == id)[0];
	else
		throw new Err({
			type: "REQ_ERR",
			message: `\`id\` (${id.toString()}) is NaN.`,
			cause: "getAnswerByID() on /src/utils/randomAnswer.ts"
		});
}
