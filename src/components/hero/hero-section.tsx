import Image from "next/image";
import { Play } from "lucide-react";

import { Button } from "@/components/ui/button";

export function HeroSection() {
	return (
		<section className="relative w-screen h-screen overflow-hidden bg-[#090D09]">
			{/* Hero Image */}
			<div className="absolute inset-0">
				<Image
					src="/images/foundathon.jpg"
					alt="Foundathon 3.0"
					fill
					priority
					className="object-cover object-center"
				/>

				{/* Left Gradient */}
				<div className="absolute inset-y-0 left-0 w-[42%] bg-linear-to-r from-background via-background/90 to-transparent" />

				{/* Bottom Gradient */}
				<div className="absolute inset-x-0 bottom-0 h-52 bg-linear-to-t from-background to-transparent" />

				{/* Top Gradient */}
				<div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-background to-transparent" />

				{/* Right Fade */}
				<div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-background to-transparent" />
			</div>

			{/* Content */}
			<div className="relative z-10 flex h-full items-center">
				<div className="max-w-xl px-8 lg:px-14">
					<h1 className="mb-8 text-5xl font-extrabold italic leading-tight text-white">
						FOUNDATHON 3.0
					</h1>

					<p className="mb-10 text-xl leading-relaxed text-white/80">
						The third edition of Founders Club's annual flagship
						hackathon promoting the advent of creative solutions to
						new-age problems.
					</p>

					<Button
						size="sm"
						className="w-auto h-auto pt-2 pb-2 pl-0 pr-0 rounded-2xl bg-white px-8 text-black hover:bg-neutral-200"
					>
						<Play className="mr-2 fill-black" size={36} />
						<span className="text-3xl font-semibold">Play</span>
					</Button>
				</div>
			</div>
		</section>
	);
}
