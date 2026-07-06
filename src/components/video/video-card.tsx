import Image from "next/image";
import Link from "next/link";

interface VideoCardProps {
	id: string;
	title: string;
	thumbnail: string;
	views: number;
}

export function VideoCard({ id, title, thumbnail, views }: VideoCardProps) {
	return (
		<Link href={`/video/${id}`} className="group block w-full max-w-sm">
			<div className="overflow-hidden rounded-2xl">
				<Image
					src={thumbnail}
					alt={title}
					width={420}
					height={240}
					className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
				/>
			</div>

			<div className="mt-3 flex items-end justify-between">
				<h3 className="line-clamp-1 text-2xl font-semibold text-white transition-colors group-hover:text-neutral-300">
					{title}
				</h3>

				<span className="text-sm text-neutral-400">
					{views.toLocaleString()} Views
				</span>
			</div>
		</Link>
	);
}
