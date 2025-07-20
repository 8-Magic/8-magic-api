import { NextRequest } from "next/server";

import allAnswers from "@/data/answers";
import { Err } from "@/data/types";
import { getAnswerByID } from "@/utils/randomAnswer";
import { failOptions, successOptions } from "@/app/(api)/api/v1/headers";
import { errorJSON, getAnswerJSON } from "@/app/(api)/api/v1/responses";

export async function GET(
	req: NextRequest,
	{
		params
	}: {
		params: Promise<{
			id: number;
		}>;
	}
) {
	try {
		const id: number = (await params).id;
		if (isNaN(id))
			throw new Err({
				type: "REQ_ERR",
				message: `Requested ID (${id}) is not a valid ID.`,
				code: 400
			});
		if (allAnswers[id - 1] === undefined)
			throw new Err({
				type: "REQ_ERR",
				message: `Requested ID (${id}) does not exist.`,
				code: 400
			});
		return new Response(
			getAnswerJSON(getAnswerByID(id)),
			successOptions("Here's your answer")
		);
	} catch (error: unknown) {
		return new Response(errorJSON(error), failOptions((error as Err)?.code));
	}
}
