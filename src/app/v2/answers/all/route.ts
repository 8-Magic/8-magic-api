import { Err, answerType, answerTypes } from "@/data/types";
import { failOptions, successOptions } from "@/app/v2/headers";
import { errorJSON } from "@/app/v2/responses";
import { getAllAnswers } from "@/utils/supabaseClient";
import { NextRequest } from "next/server";
import JSONstring from "@/utils/JSON";

/**
 * @example ```/answers?t=positive```
 */
export async function GET(req: NextRequest): Promise<Response> {
	const type: string =
		new URL(req.url).searchParams.get("type")?.trim()?.toLowerCase() ||
		new URL(req.url).searchParams.get("t")?.trim()?.toLowerCase() ||
		"all";

	try {
		if (
			(type as answerType) !== answerTypes.positive &&
			(type as answerType) !== answerTypes.neutral &&
			(type as answerType) !== answerTypes.negative &&
			(type as answerType) !== answerTypes.all
		)
			throw new Err({
				type: "REQ_ERR",
				message: "Requested type is invaild.",
				code: 400
			});

		const answers = await getAllAnswers(type);

		return new Response(
			JSONstring(
				{
					status: "success",
					data: {
						type,
						length: answers.length,
						answers
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
