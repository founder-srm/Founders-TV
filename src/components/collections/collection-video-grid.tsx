import { Film } from "lucide-react";

import { CollectionVideoCard } from "./collection-video-card";

interface CollectionVideo {
	id: string;

	title: string;

	thumbnail: string;

	duration: string;

	views: number;
}

interface CollectionVideoGridProps {
	videos: CollectionVideo[];
}

export function CollectionVideoGrid({ videos }: CollectionVideoGridProps) {
	return (
		<section className="space-y-8">
			{/* Header */}

			<div className="flex items-center justify-between">
				<div>
					<p
						className="
                            text-sm
                            uppercase
                            tracking-[0.35em]
                            text-neutral-500
                        "
					>
						Explore
					</p>

					<h2
						className="
                            mt-2
                            text-4xl
                            font-bold
                            text-white
                        "
					>
						Browse All Videos
					</h2>
				</div>

				<div
					className="
                        flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-white/10
                        bg-white/5
                        px-4
                        py-2
                        backdrop-blur-xl
                    "
				>
					<Film className="h-4 w-4 text-neutral-400" />

					<span
						className="
                            text-sm
                            font-medium
                            text-neutral-300
                        "
					>
						{videos.length} Videos
					</span>
				</div>
			</div>

			{/* Grid */}

			{videos.length === 0 ? (
				<EmptyState />
			) : (
				<div
					className="
                        grid
                        gap-6
                        md:grid-cols-2
                        xl:grid-cols-3
                    "
				>
					{videos.map((video) => (
						<CollectionVideoCard key={video.id} {...video} />
					))}
				</div>
			)}
		</section>
	);
}

function EmptyState() {
	return (
		<div
			className="
                rounded-[32px]
                border
                border-dashed
                border-white/10
                bg-white/[0.03]
                py-20
                text-center
            "
		>
			<Film
				className="
                    mx-auto
                    mb-6
                    h-12
                    w-12
                    text-neutral-600
                "
			/>

			<h3
				className="
                    text-2xl
                    font-semibold
                    text-white
                "
			>
				No Videos Yet
			</h3>

			<p
				className="
                    mt-3
                    text-neutral-400
                "
			>
				Videos for this collection will appear here once they are
				uploaded.
			</p>
		</div>
	);
}
