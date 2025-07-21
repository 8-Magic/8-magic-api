import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "v2"
};

export default function Page() {
	return (
		<>
			<h1 className="header-1">API version 2</h1>
			<p>
				This version is under development. I&apos;m planning to use{" "}
				<Link href="https://supabase.com" className="link">
					Supabase
				</Link>{" "}
				as database.
			</p>
			<p>
				This can help me to see more info (like how many times my API is being
				used).
			</p>
			<p>
				I&apos;ll create a public audit log to clearly show what data I collect
				and how it&apos;s used.
			</p>
			<p>
				For now, you can use{" "}
				<Link className="link" href="/v2/answers">
					/v2/answers
				</Link>{" "}
				to test it.
			</p>
		</>
	);
}
