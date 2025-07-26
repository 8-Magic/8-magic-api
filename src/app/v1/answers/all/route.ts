import { NextRequest } from "next/server";
import { failOptions, successOptions } from "@/app/v1/headers";
import { errorJSON } from "@/app/v1/responses";
import { getTypeAnswers } from "@/app/v1/functions";
import { getTypeLength } from "@/data/answers";
import { answerType, answerTypes, Err } from "@/data/types";
import JSONstring from "@/utils/JSON";

/**
 *
 * @example ```/allAnswers?type={ positive | neutral | negative }&number=5```
 * @example ```/allAnswers?t=neutral&n=3```
 *
 */
export async function GET(req: NextRequest): Promise<Response> {
	try {
		const type: string =
			new URL(req.url).searchParams.get("type")?.trim()?.toLowerCase() ||
			new URL(req.url).searchParams.get("t")?.trim()?.toLowerCase() ||
			"all";
		const number: number =
			Number(new URL(req.url).searchParams.get("number")?.trim()) ||
			Number(new URL(req.url).searchParams.get("n")?.trim()) ||
			0;

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

		return new Response(
			JSONstring({
				status: "success",
				data: {
					type,
					number: number !== 0 ? number : getTypeLength(type),
					answers: getTypeAnswers(type, number)
				}
			}),
			successOptions("Got the answers")
		);
	} catch (error: unknown) {
		return new Response(errorJSON(error), failOptions((error as Err)?.code));
	}
}
