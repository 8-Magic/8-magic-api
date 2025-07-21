import { Err } from "@/data/types";
import { errorCodeToText } from "./headers";
import { DBanswerType } from "@/utils/supabaseClient";

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
			"why?": `${code} ${errorCodeToText(code ?? undefined)}`,
			type,
			message: message || "An unknown error occurred",
			details,
			cause
		},
		null,
		2
	);
}

export function getAnswerJSON({
	id,
	answer,
	type,
	count
}: DBanswerType): string {
	return JSON.stringify(
		{
			status: "success",
			data: {
				answer: {
					id,
					answer,
					type,
					count
				}
			}
		},
		null,
		2
	);
}
