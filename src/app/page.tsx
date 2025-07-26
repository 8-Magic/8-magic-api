import Link from "next/link";
import "./styles.css";

export default function Page() {
	return (
		<>
			<h1 className="header-1">8-Magic API</h1>
			<p>
				This API is the beating heart of the{" "}
				<Link href="https://8.alialmasi.ir" className="link">
					8-Magic
				</Link>{" "}
				project. It is publicly available to be used freely by others.
			</p>
			<p>
				&quot;8-Magic&quot; and &quot;8-Magic API&quot; are both open source (
				<Link
					href="https://en.wikipedia.org/wiki/Free_and_open-source_software"
					className="link text-sm"
				>
					FOSS
				</Link>
				) at{" "}
				<Link href="https://github.com/8-Magic" className="link">
					GitHub
				</Link>{" "}
				as separate repositories.
			</p>
			<p>
				This API is currently at major version 1, and is available to use with
				the URL:
			</p>
			<Link href="https://api.8.alialmasi.ir/v1" className="link">
				https://api.8.alialmasi.ir/v1
			</Link>
			<p>
				Version 2 is also available{" "}
				<span className="text-sm text-red-400">
					(v1 is more stable,{" "}
					<Link href="https://api.8.alialmasi.ir/v2#attention" className="link">
						read more
					</Link>
					)
				</span>
				. In this version we&apos;re using{" "}
				<Link href="https://supabase.com" className="link">
					Supabase
				</Link>{" "}
				as PostgreSQL database platform.
			</p>
			<Link href="https://api.8.alialmasi.ir/v2" className="link">
				https://api.8.alialmasi.ir/v2
			</Link>
			<p>
				If you encountered any unexpected behavior (aka bugs), I&apos;ll be
				happy to check them out on{" "}
				<Link
					href="https://github.com/8-Magic/8-magic-api/issues"
					className="link"
				>
					GitHub issues
				</Link>
				.
			</p>
		</>
	);
}
