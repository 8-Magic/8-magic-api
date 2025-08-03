/**
 * @description String-strict types of answer
 */
export type answerType = "positive" | "neutral" | "negative" | "all";

/**
 * @description Object of answer types
 */
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

/**
 * @description Type definition of answer objects (in v1).
 */
export type answerObject = {
	id: number;
	answer: string;
	type: answerType;
	emoji: string;
};

/**
 * @description Type definition of answer arrays.
 */
export type answersArray = Array<answerObject>;

/**
 * @description General type of objects with string keys (used for header objects).
 */
export type strObject = { [key: string]: string };

/**
 * @description Custom type definition for HTTP response options object.
 */
export type httpOptionsObject = {
	status: number;
	statusText: string;
	headers: strObject;
};

/**
 * @description Definition for error types.
 */
type ErrorType = "SERV_ERR" | "REQ_ERR" | "UNKNOWN_ERR";

/**
 * @description Definition for error codes.
 */
type ErrorCodes = 400 | 404 | 406 | 418 | 500;

/**
 * @classdesc Custom error class, used through out the whole project.
 * @extends Error
 * @see ErrorType & ErrorCodes type definitions.
 */
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
