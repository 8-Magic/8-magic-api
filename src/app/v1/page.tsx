import { Metadata } from "next";

export const metadata: Metadata = {
	title: "v1"
};

export default function Page() {
	return (
		<>
			<h1 className="header-1">API version 1</h1>
			<p>
				This version features one main endpoint with two parameters
				(sub-routes).
			</p>
			<p>
				It&apos;ll return a random answer if not used with any parameter.
				Example:
			</p>
			<p className="endpoint">
				<span className="grayit">(GET)</span> /answers
			</p>
			<pre className="code-block">
				{`{
  "status": "success",
  "data": {
    "answer": {
      "id": 20,
      "answer": "Don't think about it",
      "emoji": "👎",
      "type": "negative"
    }
  }
}`}
			</pre>
			<h2 className="header-2">ID parameter</h2>
			<p>
				First parameter of this endpoint is the requested ID. You can request a
				answer object by specifying its ID number. For example:
			</p>
			<p className="endpoint">
				<span className="grayit">(GET)</span> /answers/8
			</p>
			<pre className="code-block">
				{`{
  "status": "success",
  "data": {
    "answer": {
      "id": 8,
      "answer": "Reply hazy, try again",
      "emoji": "🤷",
      "type": "neutral"
    }
  }
}`}
			</pre>
			<h2 className="header-2">&quot;all&quot; parameter</h2>
			<p>
				Second parameter is &quot;all&quot;. With this, you can request all
				answers from the API. Example:
			</p>
			<p className="endpoint">
				<span className="grayit">(GET)</span> /answers/all
			</p>
			<pre className="code-block">Why don&apos;t you try it yourself?</pre>
			<p>
				You can also filter out answers by type{" "}
				<span className="grayit">(?type | ?t)</span>, or just request a specific
				amount of answer objects <span className="grayit">(?number | ?n)</span>.
			</p>
			<p className="endpoint">
				<span className="grayit">(GET)</span> /answers/all?t=negative&number=2
			</p>
			<pre className="code-block">
				{`{
  "status": "success",
  "data": {
    "type": "negative",
    "number": 2,
    "answers": [
      {
        "id": 17,
        "answer": "My sources say no",
        "type": "negative",
        "emoji": "👎"
      },
      {
        "id": 15,
        "answer": "Don't count on it",
        "type": "negative",
        "emoji": "👎"
      }
    ]
  }
}`}
			</pre>
			<p>
				There are{" "}
				<span className="grayit">[ positive | neutral | negative ]</span> types
				of answers.
			</p>
		</>
	);
}
