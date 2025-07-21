import { Err } from "@/data/types";
import { failOptions, successOptions } from "@/app/v2/headers";
import { errorJSON, getAnswerJSON } from "@/app/v2/responses";
import { RandomRow } from "@/utils/supabaseClient";

/**
 * @example ```/answers```
 */
export async function GET(): Promise<Response> {
	try {
		return new Response(
			getAnswerJSON(await RandomRow()),
			successOptions("Here's your answer")
		);
	} catch (error: unknown) {
		return new Response(errorJSON(error), failOptions((error as Err)?.code));
	}
}
