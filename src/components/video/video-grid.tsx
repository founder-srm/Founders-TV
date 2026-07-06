import { VideoCard } from "./video-card";

interface Video {
	id: string;
	title: string;
	thumbnail: string;
	views: number;
}

interface VideoGridProps {
	title: string;
	videos: Video[];
}

export function VideoGrid({ title, videos }: VideoGridProps) {
	return (
		<section className="bg-background pl-0 pr-0 pb-24">
			<h2 className="mb-10 text-3xl font-semibold text-white">{title}</h2>

			<div className="grid bg-background grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
				{videos.map((video) => (
					<VideoCard key={video.id} {...video} />
				))}
			</div>
		</section>
	);
}
