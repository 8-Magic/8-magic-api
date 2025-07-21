import { Err, strObject, httpOptionsObject } from "@/data/types";

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
