import { Database } from "@/data/database.types";
import { answerType } from "@/data/types";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Err } from "@/data/types";
import { randomElement } from "./randomAnswer";

const supabaseUrl = "https://vafyxywqmdqxzlzlrwvx.supabase.co";
const supabaseKey = process.env.SB_API_TOKEN as string;
const supabase: SupabaseClient = createClient<Database>(
	supabaseUrl,
	supabaseKey
);

export default supabase;

export type DBanswerType = {
	id: number;
	answer: string;
	type: answerType;
	count: number;
};

export async function RandomRow(): Promise<DBanswerType> {
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
