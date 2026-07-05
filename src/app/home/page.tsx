"use client"; // This must be the first line of code

import { HeroSection } from "@/components/hero/hero-section";
import { Navbar } from "@/components/layout/navbar";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center p-18">
			<Navbar />
			<HeroSection />
		</main>
	);
}
