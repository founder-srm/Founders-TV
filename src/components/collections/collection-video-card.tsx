import Image from "next/image";
import Link from "next/link";
import { Clock3, Eye, Play } from "lucide-react";

import { Button } from "@/components/ui/button";

interface CollectionVideoCardProps {
	id: string;

	title: string;

	thumbnail: string;

	duration: string;

	views: number;
}

export function CollectionVideoCard({
	id,
	title,
	thumbnail,
	duration,
	views,
}: CollectionVideoCardProps) {
	return (
		<article
			className="
                group
                overflow-hidden
                rounded-[28px]
                border
                border-white/10
                bg-white/[0.035]
                transition-all
                duration-300
                hover:border-white/20
            "
		>
			{/* Thumbnail */}

			<div className="relative aspect-video overflow-hidden">
				<Image
					src={thumbnail}
					alt={title}
					fill
					className="
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                    "
				/>

				<div
					className="
                        absolute
                        bottom-3
                        right-3
                        rounded-lg
                        bg-black/70
                        px-2
                        py-1
                        text-xs
                        font-medium
                        text-white
                        backdrop-blur
                    "
				>
					{duration}
				</div>
			</div>

			{/* Body */}

			<div className="space-y-5 p-5">
				<h3
					className="
                        line-clamp-2
                        text-lg
                        font-semibold
                        text-white
                    "
				>
					{title}
				</h3>

				<div
					className="
                        flex
                        items-center
                        justify-between
                    "
				>
					<div
						className="
                            flex
                            items-center
                            gap-4
                            text-sm
                            text-neutral-400
                        "
					>
						<span className="flex items-center gap-2">
							<Eye size={16} />
							{views.toLocaleString()}
						</span>

						<span className="flex items-center gap-2">
							<Clock3 size={16} />
							{duration}
						</span>
					</div>

					<Button size="icon" asChild className="rounded-full">
						<Link href={`/video/${id}`}>
							<Play
								className="
                                    h-4
                                    w-4
                                    fill-current
                                "
							/>
						</Link>
					</Button>
				</div>
			</div>
		</article>
	);
}
