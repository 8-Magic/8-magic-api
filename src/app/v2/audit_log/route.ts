import supabase from "@/utils/supabaseClient";

export async function GET() {
	try {
		const { data, error } = await supabase
			.from("audit_log")
			.select("*")
			.order("timestamp", {
				ascending: false
			})
			.limit(50);
		if (error) throw error;
		return new Response(JSON.stringify(data, null, 4), {
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			}
		});
	} catch (err: unknown) {
		return new Response(JSON.stringify(err, null, 4), {
			status: 500,
			headers: {
				"Content-Type": "application/json"
			}
		});
	}
}
