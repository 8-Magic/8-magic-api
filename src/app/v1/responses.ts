import { answerObject, Err } from "@/data/types";
import { errorCodeToText } from "./headers";

/**
 *
 * @param error Is used for describing the error to the user.
 * @returns {string} JSON string response containing details about error.
 */
export function errorJSON(error: unknown): string {
	const { type, message, cause, code, details } = error as Err;
	return JSON.stringify(
		{
			status: "fail",
			"why?":
				code !== undefined
					? `${code} ${errorCodeToText(code ?? undefined)}`
					: "honestly IDK",
			type,
			message: message || "An unknown error occurred",
			details: details || "No details specified for this error",
			cause: cause || "No cause specified for this error"
		},
		null,
		2
	);
}

export function getAnswerJSON({
	id,
	answer,
	type,
	emoji
}: answerObject): string {
	return JSON.stringify(
		{
			status: "success",
			data: {
				answer: {
					id,
					answer,
					emoji,
					type
				}
			}
		},
		null,
		2
	);
}
