import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface VideoCardProps {
	id: string;
	title: string;
	thumbnailUrl: string;
	viewCount: number;
}

export function VideoCard({
	id,
	title,
	thumbnailUrl,
	viewCount,
}: VideoCardProps) {
	return (
		<Link href={`/video/${id}`} className="group block w-full max-w-sm">
			<div className="overflow-hidden rounded-2xl">
				<Image
					src={thumbnailUrl}
					alt={title}
					width={420}
					height={240}
					className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
				/>
			</div>

			<div className="mt-3 flex flex-col items-start">
				<h3 className="line-clamp-1 text-xl font-semibold text-white transition-colors group-hover:text-neutral-300">
					{title}
				</h3>

				<span className="text-sm text-neutral-400 w-full">
					<div className="flex gap-1">
						<Eye className="pt-0.5" size={18} />{" "}
						{viewCount.toLocaleString()} Views
					</div>
				</span>
			</div>
		</Link>
	);
}
