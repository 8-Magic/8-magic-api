import { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./styles.css";
import BackButton from "./BackButton";

const mono = JetBrains_Mono({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-jetbrains"
});

export const metadata: Metadata = {
	title: { template: "8-Magic API %s", default: "8-Magic API" },
	openGraph: {
		type: "website",
		url: "https://api.8.alialmasi.ir",
		title: "8-Magic API",
		description:
			"A clairvoyant piece of API // Part of the 8-Magic project // 8.alialmasi.ir",
		siteName: "8-Magic API",
		images: [
			{
				url: "https://api.8.alialmasi.ir/ogp",
				width: 1200,
				height: 630
			}
		]
	},
	twitter: {
		site: "@al1almasi"
	},
	description: "A clairvoyant piece of API // Part of the 8-magic project",
	creator: "Ali Almasi",
	authors: [{ name: "Ali Almasi", url: "https://alialmasi.ir" }],
	formatDetection: {
		telephone: false,
		email: false,
		address: false
	},
	icons: {
		icon: [{ url: "/logo.svg", type: "image/svg+xml" }]
	},
	referrer: "origin-when-cross-origin"
};

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="w-full h-full">
			<body className={`${mono.className} antialiased w-full py-6`}>
				<div
					className={`${mono.className} flex max-w-150 p-6 mx-auto justify-center flex-col gap-6 text-left`}
				>
					<BackButton />
					{children}
				</div>
			</body>
		</html>
	);
}
