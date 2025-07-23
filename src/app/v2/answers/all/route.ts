import { Err } from "@/data/types";
import { failOptions, successOptions } from "@/app/v2/headers";
import { errorJSON } from "@/app/v2/responses";
import { getAllAnswers } from "@/utils/supabaseClient";
import { NextRequest } from "next/server";

/**
 * @example ```/answers```
 */
export async function GET(req: NextRequest): Promise<Response> {
	const type: string =
		new URL(req.url).searchParams.get("type")?.trim()?.toLowerCase() ||
		new URL(req.url).searchParams.get("t")?.trim()?.toLowerCase() ||
		"all";

	try {
		return new Response(
			JSON.stringify(
				{
					status: "success",
					data: {
						type,
						answers: await getAllAnswers(type)
					}
				},
				null,
				2
			),
			successOptions("Here's your answer")
		);
	} catch (error: unknown) {
		return new Response(errorJSON(error), failOptions((error as Err)?.code));
	}
}
