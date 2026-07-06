"use client";

import clsx from "clsx";

interface VideoPlayerProps {
	youtubeId: string;
	title: string;
	className?: string;
}

export function VideoPlayer({ youtubeId, title, className }: VideoPlayerProps) {
	return (
		<section className={clsx("w-full", className)}>
			<div
				className="
                    overflow-hidden
                    rounded-[32px]
                    border
                    border-white/10
                    bg-neutral-950
                    shadow-[0_20px_80px_rgba(0,0,0,0.45)]
                "
			>
				<div className="aspect-video w-full">
					<iframe
						src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
						title={title}
						allow="
                            accelerometer;
                            autoplay;
                            clipboard-write;
                            encrypted-media;
                            gyroscope;
                            picture-in-picture;
                            web-share
                        "
						allowFullScreen
						loading="lazy"
						className="
                            h-full
                            w-full
                            border-0
                        "
					/>
				</div>
			</div>
		</section>
	);
}
