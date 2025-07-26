"use client";
import JSONstring from "@/utils/JSON";
import { randomAnswer } from "@/utils/randomAnswer";
import { usePathname } from "next/navigation";

export default function BackButton(): React.ReactNode {
	const answer = randomAnswer();
	const path = usePathname();
	if (path.includes("/audit_log")) return;
	return path !== "/" ? (
		<button
			onClick={() =>
				(window.location.href =
					"/" +
					window.location.pathname
						.split("/")
						.filter(Boolean)
						.slice(0, -1)
						.join("/"))
			}
			className="before:content-['^'] before:absolute before:text-stone-200 relative before:left-3 pl-8 px-2 py-2 hover:text-stone-900 hover:before:text-stone-900 hover:bg-stone-200 text-left cursor-pointer border w-fit"
		>
			Go Up
		</button>
	) : (
		<p className="text-stone-400" suppressHydrationWarning={true}>
			{JSONstring(answer)}
		</p>
	);
}
