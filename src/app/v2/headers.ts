import { Err, strObject, httpOptionsObject } from "@/data/types";

/**
 *
 * @param {string} contentType Used to specify custom `"Content-Type"` in header
 * @returns {strObject} Header object used in responses
 */
export const headers = (contentType: string): strObject => {
	if (!contentType) {
		throw new Err({
			type: "SERV_ERR",
			message: "Content-Type not defined correctly in HTTP response headers.",
			cause: "headers() on /src/app/api/v1/headers.ts"
		});
	}
	return {
		"Content-Type": `${contentType}; charset=UTF-8`,
		"Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
		Pragma: "no-cache",
		Expires: "0"
	};
};

/**
 *
 * @param {number | string} code Used to determine what string it should return as error status.
 * @returns {string} An error status message based on the input error code.
 */
export const errorCodeToText = (code?: number | string): string => {
	if (typeof code === "string") code = parseInt(code);
	if (code !== undefined)
		switch (code) {
			case 400:
				return "Terrible request";
			case 404:
				return "Where is it?";
			case 406:
				return "No, I don't want this";
			case 418:
				return "Um...";
			case 500:
				return "Skyler, I am the problem!";
			default:
				throw new Err({
					type: "SERV_ERR",
					message: "Parameter `code` is not valid.",
					cause: "errorCodeToText() on /src/app/api/v1/headers.ts",
					code: 500
				});
		}
	else return "";
};

/**
 *
 * @param {string} message To specify custom success response status.
 * @param {number} code To specify custom success response code.
 * @param {string} contentType To specify custom `"Content-Type"` for response header.
 * @returns {httpOptionsObject} HTTP response options, used in successful responses.
 */
export const successOptions = (
	message: string = "Here's your answer",
	code: number = 200,
	contentType: string = "application/json"
): httpOptionsObject => {
	return {
		status: code,
		statusText: message,
		headers: headers(contentType)
	};
};

/**
 *
 * @param {number} code To specify custom error response code.
 * @param {string} contentType To specify custom `"Content-Type"` for response header.
 * @returns {httpOptionsObject} HTTP response options, used in failed responses.
 */
export const failOptions = (
	code: number = 500,
	contentType: string = "application/json"
): httpOptionsObject => {
	return {
		status: code,
		statusText: errorCodeToText(code),
		headers: headers(contentType)
	};
};
