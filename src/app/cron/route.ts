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

		if ((await supabase.from("answers").select("*")).error)
			throw new Error("Supabase client faced an error");

		const res = await fetch(
			`https://api.telegram.org/bot${token}/sendMessage`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					chat_id: chatId,
					text: {
						timestamp: new Date().toISOString(),
						status: db.status,
						db
					}
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
		const res = await fetch(
			`https://api.telegram.org/bot${token}/sendMessage`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					chat_id: chatId,
					text: {
						timestamp: new Date().toISOString(),
						error
					}
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
