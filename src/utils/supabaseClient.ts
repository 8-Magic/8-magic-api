import { Database } from "@/data/database.types";
import { answerType } from "@/data/types";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Err } from "@/data/types";
import { randomElement } from "./randomAnswer";

const supabase: SupabaseClient = createClient<Database>(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default supabase;

export type DBanswerType = {
	id: number;
	answer: string;
	type: answerType;
	count: number;
};

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

export async function getAnswerbyID(id: number) {
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

export async function getAllAnswers(
	type: answerType | string
): Promise<DBanswerType[]> {
	if (type && typeof type === "string" && type !== "all") {
		type = type.toLowerCase().trim();

		const { data, error: fetchError } = await supabase
			.from("answers")
			.select("*")
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
		if (type === "all") {
			const { data, error: fetchError } = await supabase
				.from("answers")
				.select("*");

			const fetchArray = data as DBanswerType[];

			if (fetchError)
				throw new Err({
					message: "Error while fetching data from database",
					type: "UNKNOWN_ERR",
					details: fetchError.message
				});

			return fetchArray;
		} else
			throw new Err({
				message: "Requested ID is invalid",
				type: "REQ_ERR",
				code: 400,
				cause: "getAnswerbyID() on /src/utils/supabaseClient.ts"
			});
	}
}
