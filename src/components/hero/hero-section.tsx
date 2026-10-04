import { Play } from "lucide-react";
import { Bangers } from "next/font/google";
import Image from "next/image";

import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

const bangers = Bangers({ subsets: ["latin"], weight: "400" });

export function HeroSection() {
	return (
		<section className="relative w-screen h-screen overflow-hidden bg-background">
			{/* Hero Image */}
			<div className="absolute inset-0">
				<div className="absolute inset-y-0 right-0 w-[90%]">
					<Image
						src="/images/foundathon.jpg"
						alt="Foundathon 3.0"
						fill
						sizes="80vw"
						priority
						className="object-cover object-center translate-x-22"
					/>
				</div>

				{/* Left Gradient */}
				<div className="absolute inset-y-0 left-54 w-[30%] bg-linear-to-r from-background via-background/90 to-transparent" />

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
					<h1 className={`${bangers.className} mb-8 text-7xl text-white`}>
						CLUB WARS
					</h1>

					<p className="mb-10 text-xl leading-relaxed text-white/80">
						Club Wars is Founders Club flagship event where all the clubs in the campus come together to compete in a series of challenges and activities.
					</p>

					<Button
						size="icon-lg"
						className="w-auto h-auto pt-2 pb-2 pl-0 pr-0 rounded-2xl bg-white px-8 text-black hover:bg-neutral-200"
						onClick={() => redirect("/video/1fff445e-c79d-48d1-95f7-a35663dbe17e")}
					>
						<Play className="mr-2 fill-black" size={36} />
						<span className="text-3xl font-semibold">Play</span>
					</Button>
				</div>
			</div>
		</section>
	);
}
