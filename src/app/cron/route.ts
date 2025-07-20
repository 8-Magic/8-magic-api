export async function GET(): Promise<Response> {
	console.log("Cron job executed at:", new Date().toISOString());
	const response = await fetch("https://api.8.alialmasi.ir/v1/answers");
	console.log(await response.json());

	return new Response("Cron job executed successfully!");
}
