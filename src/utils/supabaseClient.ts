import { Database } from "@/data/database.types";
import { answerType } from "@/data/types";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Err } from "@/data/types";
import { randomElement } from "./randomAnswer";
import JSONstring from "./JSON";

/**
 * @description Supabase client, with public keys specified by default.
 */
const supabase: SupabaseClient = createClient<Database, "public">(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default supabase;

/**
 * @description Type definition of answer objects from database (in v2).
 */
export type DBanswerType = {
	id: number;
	answer: string;
	type: answerType;
	count: number;
};

/**
 * @returns {Promise<DBanswerType>} Promise for a random answer from database.
 */
export async function RandomAnswer(): Promise<DBanswerType> {
	const { data: fetchArray, error: fetchError } = await supabase
		.from<"answers", DBanswerType>("answers")
		.select("*");

	const answer: DBanswerType = randomElement(
		fetchArray as Array<unknown>
	) as DBanswerType;

	if (fetchError)
		throw new Err({
			message: "Error while fetching data from database",
			type: "UNKNOWN_ERR",
			details: fetchError.message
		});

	const { data: updated, error: rpcError } = await supabase.rpc(
		"increment_answer_count",
		{ row_id: answer.id }
	);

	if (rpcError)
		throw new Err({
			message: "Error while running rpc database function",
			type: "UNKNOWN_ERR",
			details: rpcError.message
		});

	return updated?.[0] as DBanswerType;
}

/**
 * @param {number} id Specify id of answer object you want from database
 * @returns {Promise<DBanswerType>} Promise for an ID-specified answer object from database.
 */
export async function getAnswerbyID(id: number): Promise<DBanswerType> {
	if (id && typeof id === "number") {
		const { data, error: fetchError } = await supabase
			.from("answers")
			.select("*")
			.eq("id", id);

		const fetchArray = data as DBanswerType[];

		const answer: DBanswerType = randomElement(
			fetchArray as Array<unknown>
		) as DBanswerType;

		if (fetchError)
			throw new Err({
				message: "Error while fetching data from database",
				type: "UNKNOWN_ERR",
				details: fetchError.message
			});

		const { data: updated, error: rpcError } = await supabase.rpc(
			"increment_answer_count",
			{ row_id: answer.id }
		);

		if (rpcError)
			throw new Err({
				message: "Error while running rpc database function",
				type: "UNKNOWN_ERR",
				details: rpcError.message
			});

		return updated?.[0] as DBanswerType;
	} else
		throw new Err({
			message: "Requested ID is invalid",
			type: "REQ_ERR",
			code: 400,
			cause: "getAnswerbyID() on /src/utils/supabaseClient.ts"
		});
}

/**
 *
 * @param {string} type (Default: all) Used for specifying type of answers you want to receive
 * @returns {Promise<DBanswerType[]>} A promise for an array of answers from a type
 */
export async function getAllAnswers(
	type: answerType | string
): Promise<DBanswerType[]> {
	if (type && typeof type === "string" && type !== "all") {
		type = type.toLowerCase().trim();

		const { data, error: fetchError } = await supabase
			.from("answers")
			.select("*")
			.order("id")
			.eq("type", type);

		const fetchArray = data as DBanswerType[];

		if (fetchError)
			throw new Err({
				message: "Error while fetching data from database",
				type: "UNKNOWN_ERR",
				details: fetchError.message
			});

		return fetchArray;
	} else {
		const { data, error: fetchError } = await supabase
			.from("answers")
			.select("*")
			.order("id");

		const fetchArray = data as DBanswerType[];

		if (fetchError)
			throw new Err({
				message: "Error while fetching data from database",
				type: "UNKNOWN_ERR",
				details: fetchError.message
			});

		return fetchArray;
	}
}

/**
 * Gets length of all answers in database.
 * @returns {object} Object of all answer lengths, separated by types.
 */
export async function getAllAnswersLength(): Promise<{
	all: number;
	positive: number;
	neutral: number;
	negative: number;
}> {
	const { data, error } = await supabase
		.from("answers")
		.select("*")
		.order("id", { ascending: true });

	if (error)
		throw new Err({
			message: "Error while fetching data length from database",
			type: "UNKNOWN_ERR",
			cause: "getAllAnswersLength() on /src/utils/supabaseClient.ts",
			details: error.message
		});

	let positive = 0,
		neutral = 0,
		negative = 0;

	data.forEach((answerObject: DBanswerType) => {
		switch (answerObject.type) {
			case "positive": {
				positive++;
				break;
			}
			case "neutral": {
				neutral++;
				break;
			}
			case "negative": {
				negative++;
				break;
			}
			default: {
				throw new Err({
					message: `answerObject.type is not defined correctly`,
					type: "SERV_ERR",
					code: 500,
					cause: "getAllAnswersLength() on /src/utils/supabaseClient.ts",
					details: JSONstring(answerObject)
				});
			}
		}
	});

	return { all: data.length, positive, neutral, negative };
}
