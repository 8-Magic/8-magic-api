import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
	const answer = await (
		await fetch("https://api.8.alialmasi.ir/v1/answers")
	).json();
	const token = process.env.TG_BOT;
	const chatId = process.env.TG_CHAT_ID;
	const text = JSON.stringify({
		timestamp: new Date().toISOString(),
		status: answer.status
	});

	const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			chat_id: chatId,
			text
		})
	});

	const data = await res.json();

	if (!data.ok) {
		console.error("Telegram Error:", data);
		return NextResponse.json(
			{ success: false, error: data.description },
			{ status: 500 }
		);
	}

	return NextResponse.json({ success: true });
}
