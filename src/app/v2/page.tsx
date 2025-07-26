import { getAllAnswersLength } from "@/utils/supabaseClient";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "v2"
};

export default async function Page() {
	return (
		<>
			<h1 className="header-1">API version 2</h1>
			<blockquote className="blockquote" id="attention">
				<h2 className="header-2">Attention: v1 is more stable</h2>
				<p>
					This version is not experimental or in development, but it&apos;s not
					as stable as v1. We recommend you to use v1, but you can still use v2.
				</p>
			</blockquote>
			<p>
				Using a database helps us to see more info (like how many times our API
				is being used) and to have many more answer entries (which right now is{" "}
				<Link href="/v2/answers/all" className="link">
					{(await getAllAnswersLength()).all} answers
				</Link>
				.)
			</p>
			<p>
				Not storing all this amount answer objects in database (but, like in v1,
				storing in static files &mdash;{" "}
				<span className="text-sm">
					see{" "}
					<Link
						href="https://github.com/8-Magic/8-magic-api/blob/main/src/data/answers.ts"
						className="link"
					>
						/src/data/answers.ts
					</Link>
				</span>
				) could make the perfomance really bad.
			</p>
			<h2 className="header-2">v2 changes</h2>
			<p>
				Pretty similar to v1, we have the same main endpoint{" "}
				<code className="mono code-line">/answers</code> but with some changes.
			</p>
			<p>
				First, we don&apos;t have the{" "}
				<code className="mono code-line">/answers/ID</code> sub-route, so you
				can&apos;t select a specific answer object anymore.
			</p>
			<p>
				Second, the &quot;?number&quot; parameters from the{" "}
				<code className="mono code-line">/answers/all</code> sub-route has been
				removed.
			</p>
			<h2 className="header-2">v2 answerObject type</h2>
			<p>In v2, we have a different object type for answers.</p>
			<pre className="code-block" aria-details="before-false">
				{`type DBanswerType = {
	id: number;
	answer: string;
	type: answerType;
	count: number;
};`}
			</pre>
			<p>
				See{" "}
				<Link
					href="https://github.com/8-Magic/8-magic-api/blob/main/src/utils/supabaseClient.ts"
					className="link"
				>
					/src/utils/supabaseClient.ts:14
				</Link>{" "}
				for more info.
			</p>
			<h2 className="header-2">v2 endpoints</h2>
			<p>With all that, let&apos;s go for the examples.</p>
			<p className="endpoint">
				<span className="grayit">(GET)</span> /answers
			</p>
			<pre className="code-block">
				{`{
  "status": "success",
  "data": {
    "answer": {
      "id": 98,
      "answer": "Turn back Now",
      "type": "negative",
      "count": 1
    }
  }
}`}
			</pre>
			<p>
				As you can see <span className="code-line">(&quot;id&quot;: 98)</span>,
				we have way more answer objects available in v2.
			</p>
			<p className="endpoint">
				<span className="grayit">(GET)</span> /answers/all
			</p>
			<pre className="code-block">
				{`{
  "status": "success",
  "data": {
    "type": "all",
    "length": 132,
    "answers": [
      {
        "id": 1,
        "answer": "Without a doubt",
        "type": "positive",
        "count": 6,
        "updated_at": "2025-07-23T19:44:12.286792+00:00"
      },
      {...},
	  ...
	]
  }
}`}
			</pre>
			<p>You&apos;ll receive all answers in an array</p>
			<p>You can also specify &quot;?type | ?t&quot; on this subroute.</p>
			<p className="endpoint">
				<span className="grayit">(GET)</span> /answers/all?t=positive
			</p>
			<pre className="code-block">Why don&apos;t you try it yourself?</pre>
		</>
	);
}
