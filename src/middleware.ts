import { NextResponse } from "next/server";

export function middleware() {
	const res = NextResponse.next();
	res.headers.append("Access-Control-Allow-Origin", "*");
	res.headers.append("Access-Control-Allow-Methods", "GET");
	res.headers.append(
		"Access-Control-Allow-Headers",
		"Content-Type,Authorization"
	);
	res.headers.append("Access-Control-Allow-Credentials", "true");
	return res;
}
