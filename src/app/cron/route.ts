import { NextResponse } from "next/server";
import { Database } from "@/data/database.types";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export async function GET(): Promise<NextResponse> {
	const supabaseUrl = "https://vafyxywqmdqxzlzlrwvx.supabase.co";
	const supabaseKey = process.env.SB_API_TOKEN as string;
	const supabase: SupabaseClient = createClient<Database>(
		supabaseUrl,
		supabaseKey
	);
	const token = process.env.TG_BOT;
	const chatId = process.env.TG_CHAT_ID;
	try {
		const db = await supabase.from("answers").select("*");
		const text = JSON.stringify(
			{
				timestamp: new Date().toISOString(),
				status: db.status,
				supabase: {
					status: db.statusText,
					count: db.count
				}
			},
			null,
			2
		);

		if (db.error)
			throw new Error(
				`${db.error.code}: ${db.error.message}: ${db.error.details}`
			);

		const res = await fetch(
			`https://api.telegram.org/bot${token}/sendMessage`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					chat_id: chatId,
					text
				})
			}
		);

		const data = await res.json();

		if (!data.ok) {
			console.error("Telegram Error:", data);
			return NextResponse.json(
				{ success: false, error: data.description },
				{ status: 500 }
			);
		}

		return NextResponse.json({ success: true });
	} catch (error: unknown) {
		const text = JSON.stringify(
			{
				timestamp: new Date().toISOString(),
				error
			},
			null,
			2
		);
		const res = await fetch(
			`https://api.telegram.org/bot${token}/sendMessage`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					chat_id: chatId,
					text
				})
			}
		);

		const data = await res.json();

		if (!data.ok) {
			console.error("Telegram Error:", data);
			return NextResponse.json(
				{ success: false, error: data.description },
				{ status: 500 }
			);
		}

		return NextResponse.json({ success: false, error }, { status: 500 });
	}
}
