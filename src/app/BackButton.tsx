"use client";
import JSONstring from "@/utils/JSON";
import { randomAnswer } from "@/utils/randomAnswer";
import { useRouter, usePathname } from "next/navigation";

/**
 * @description A button which will take the user up directory in certain paths.
 * @requires `/src/utils/randomAnswer`
 * @requires `next/navigation/useRouter`
 * @requires `next/navigation/usePathname`
 */
export default function BackButton(): React.ReactNode {
	const { id, answer, type } = randomAnswer();

	const router = useRouter();
	const path = usePathname();
	const handleBackClick = () => {
		const segments = path.split("/").filter(Boolean).slice(0, -1);
		const newPath = "/" + segments.join("/");
		router.push(newPath || "/");
	};

	if (path.includes("/audit_log")) return;
	return path !== "/" ? (
		<button
			onClick={handleBackClick}
			className="before:content-['<-'] before:absolute before:text-stone-200 relative before:left-3 pl-10 px-4 py-2 hover:text-stone-900 hover:before:text-stone-900 hover:bg-stone-200 text-left cursor-pointer border w-fit"
		>
			Go Back
		</button>
	) : (
		<p className="text-stone-400 text-sm -mb-4" suppressHydrationWarning={true}>
			{JSONstring({ id, answer, type }).slice(1, -1).trim()}
		</p>
	);
}
