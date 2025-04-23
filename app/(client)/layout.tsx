import type { Metadata } from "next";

import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
export const metadata: Metadata = {
	title: {
		template: "%s | Sklep Demo",
		default: "Sklep Demo",
	},

	description:
		"Demo sklepu Next15 + Sanity CMS + Stripe + TailwindCSS + TypeScript",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<Header />
			<main className='flex-1 '>{children}</main>
			<Footer />
		</ClerkProvider>
	);
}
