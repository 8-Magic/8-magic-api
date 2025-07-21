export type answerType = "positive" | "neutral" | "negative" | "all";

export const answerTypes: {
	positive: answerType;
	neutral: answerType;
	negative: answerType;
	all: answerType;
} = Object.freeze({
	positive: "positive",
	neutral: "neutral",
	negative: "negative",
	all: "all"
});

export type answerObject = {
	id: number;
	answer: string;
	type: answerType;
	emoji: string;
};

export type answersArray = Array<answerObject>;

export type strObject = { [key: string]: string };

export type httpOptionsObject = {
	status: number;
	statusText: string;
	headers: strObject;
};

type ErrorType = "SERV_ERR" | "REQ_ERR" | "UNKNOWN_ERR";

type ErrorCodes = 400 | 404 | 406 | 418 | 500;

export class Err extends Error {
	type: ErrorType;
	message: string;
	cause?: string;
	code?: ErrorCodes;
	details?: string;

	constructor({
		type,
		message,
		cause,
		code,
		details
	}: {
		type: ErrorType;
		message: string;
		cause?: string;
		code?: ErrorCodes;
		details?: string;
	}) {
		super();
		this.type = type;
		this.message = message;
		this.cause = cause;
		this.code = code;
		this.details = details;
	}
}
