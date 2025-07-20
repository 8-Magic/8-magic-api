"use client";
import { randomAnswer } from "@/utils/randomAnswer";
import { usePathname } from "next/navigation";

export default function BackButton(): React.ReactNode {
	const answer = randomAnswer();
	return usePathname() !== "/" ? (
		<button
			onClick={() => window.history.back()}
			className="before:content-['<-'] before:absolute before:text-stone-200 relative before:left-2 pl-8 px-2 py-2 hover:text-stone-900 hover:before:text-stone-900 hover:bg-stone-200 text-left cursor-pointer border-1 w-fit"
		>
			Go back
		</button>
	) : (
		<p className="text-stone-400">
			{answer.emoji} {answer.answer}
		</p>
	);
}
