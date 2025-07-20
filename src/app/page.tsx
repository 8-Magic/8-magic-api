import Link from "next/link";
import "./styles.css";

export default function Page() {
	return (
		<>
			<h1 className="header-1">8-Magic API</h1>
			<p>
				This is a easy-to-use API for other apps and services to use the{" "}
				<Link href="https://8.alialmasi.ir" className="link">
					8-Magic
				</Link>{" "}
				answers.
			</p>
			<p>
				This API is currently at major version 1, and is available to use with
				the URL:
			</p>
			<Link href="/v1" className="link">
				https://api.8.alialmasi.ir/v1
			</Link>
			<p>
				If you encountered any unexpected behavior (aka bugs), I&apos;ll be
				happy to check them out on{" "}
				<Link
					href="https://github.com/alialmasi/8-magic-api/issues"
					className="link"
				>
					GitHub issues
				</Link>
				.
			</p>
		</>
	);
}
