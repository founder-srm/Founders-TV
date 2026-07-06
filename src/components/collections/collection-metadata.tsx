import { CalendarDays, MapPin, Trophy, Users, Video } from "lucide-react";

interface CollectionMetadataProps {
	eventType: string;

	eventDate: string;

	venue: string;

	participants: number;

	totalVideos: number;

	totalViews: number;

	totalLikes: number;

	totalComments: number;
}

export function CollectionMetadata({
	eventType,
	eventDate,
	venue,
	totalVideos,
	participants,
}: CollectionMetadataProps) {
	return (
		<section
			className="
                -mt-12
                relative
                z-20
                grid
                gap-5
                md:grid-cols-2
                xl:grid-cols-5
            "
		>
			<MetadataCard
				icon={<Trophy className="h-5 w-5" />}
				title="Event Type"
				value={eventType}
			/>

			<MetadataCard
				icon={<CalendarDays className="h-5 w-5" />}
				title="Date"
				value={eventDate}
			/>

			<MetadataCard
				icon={<MapPin className="h-5 w-5" />}
				title="Venue"
				value={venue}
			/>

			<MetadataCard
				icon={<Video className="h-5 w-5" />}
				title="Videos"
				value={totalVideos.toString()}
			/>

			<MetadataCard
				icon={<Users className="h-5 w-5" />}
				title="Participants"
				value={participants.toLocaleString()}
			/>
		</section>
	);
}

interface MetadataCardProps {
	icon: React.ReactNode;

	title: string;

	value: string;
}

function MetadataCard({ icon, title, value }: MetadataCardProps) {
	return (
		<div
			className="
                rounded-[28px]
                border
                border-white/10
                bg-black/70
                p-6
                backdrop-blur-2xl
                transition-all
                duration-300
                hover:border-white/20
                hover:bg-black/80
            "
		>
			<div className="mb-6">
				<div
					className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/10
                        bg-white/5
                        text-white
                    "
				>
					{icon}
				</div>
			</div>

			<div
				className="
                    text-sm
                    uppercase
                    tracking-widest
                    text-neutral-500
                "
			>
				{title}
			</div>

			<div
				className="
                    mt-2
                    text-xl
                    font-semibold
                    text-white
                "
			>
				{value}
			</div>
		</div>
	);
}
