import { NextRequest } from "next/server";
import { randomAnswer } from "@/utils/randomAnswer";
import { answerType, Err } from "@/data/types";
import { failOptions, successOptions } from "@/app/v1/headers";
import { errorJSON, getAnswerJSON } from "@/app/v1/responses";

/**
 * @example ```/answers?type=negative```
 *
 * @example ```/answers?t=negative```
 */
export async function GET(req: NextRequest): Promise<Response> {
	try {
		const reqType: answerType | string =
			new URL(req.url).searchParams.get("type")?.trim()?.toLowerCase() ||
			new URL(req.url).searchParams.get("t")?.trim()?.toLowerCase() ||
			"";

		return new Response(
			getAnswerJSON(randomAnswer(reqType)),
			successOptions("Here's your answer")
		);
	} catch (error: unknown) {
		return new Response(errorJSON(error), failOptions((error as Err)?.code));
	}
}
