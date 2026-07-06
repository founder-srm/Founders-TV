import Image from "next/image";

interface CollectionHeroProps {
	title: string;
	subtitle: string;

	heroImage: string;

	totalVideos: number;

	totalViews: number;
}

export function CollectionHero({
	title,
	subtitle,
	heroImage,
	totalVideos,
	totalViews,
}: CollectionHeroProps) {
	return (
		<section
			className="
				my-10
                relative
                h-130
                overflow-hidden
                rounded-[36px]
                border
                border-white/10
            "
		>
			{/* Background Image */}

			<Image
				src={heroImage}
				alt={title}
				fill
				priority
				className="object-cover"
			/>

			{/* Dark Overlay */}

			<div
				className="
                    absolute
                    inset-0
                    bg-black/45
                "
			/>

			{/* Left Gradient */}

			<div
				className="
                    absolute
                    inset-y-0
                    left-0
                    w-2/3
                    bg-gradient-to-r
                    from-black
                    via-black/80
                    to-transparent
                "
			/>

			{/* Bottom Gradient */}

			<div
				className="
                    absolute
                    inset-x-0
                    bottom-0
                    h-52
                    bg-gradient-to-t
                    from-black
                    to-transparent
                "
			/>

			{/* Content */}

			<div
				className="
                    relative
                    z-10
                    flex
                    h-full
                    items-end
                "
			>
				<div className="space-y-6 p-12">
					<div>
						<p
							className="
                                text-xl
                                text-neutral-300
                            "
						>
							Event Collection
						</p>

						<h1
							className="
                                mt-2
                                text-5xl
                                font-bold
                                tracking-tight
                                text-white
                            "
						>
							{title}
						</h1>

						<p
							className="
                                mt-3
                                text-xl
                                text-neutral-300
                            "
						>
							{subtitle}
						</p>
					</div>

					<div className="flex gap-4">
						<QuickStat
							value={totalVideos.toString()}
							label="Videos"
						/>

						<QuickStat
							value={`${(totalViews / 1000).toFixed(1)}K`}
							label="Views"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

interface QuickStatProps {
	value: string;
	label: string;
}

function QuickStat({ value, label }: QuickStatProps) {
	return (
		<div
			className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                px-5
                py-3
                backdrop-blur-xl
            "
		>
			<div
				className="
                    text-2xl
                    font-bold
                    text-white
                "
			>
				{value}
			</div>

			<div
				className="
                    text-sm
                    text-neutral-400
                "
			>
				{label}
			</div>
		</div>
	);
}
