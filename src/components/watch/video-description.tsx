"use client";

import { useMemo, useState } from "react";
import { CalendarDays, MapPin, Users } from "lucide-react";

interface VideoDescriptionProps {
	description: string;

	eventDate: string;

	eventLocation?: string;

	participants?: number;
}

export function VideoDescription({
	description,
	eventDate,
	eventLocation,
	participants,
}: VideoDescriptionProps) {
	const [expanded, setExpanded] = useState(false);

	const preview = useMemo(() => {
		if (description.length <= 260) return description;

		return description.slice(0, 260) + "...";
	}, [description]);

	return (
		<section
			className="
                rounded-[30px]
                border
                border-white/10
                bg-white/[0.035]
                p-8
                backdrop-blur-xl
            "
		>
			{/* Metadata */}

			<div className="mb-8 flex flex-wrap gap-3">
				<MetadataChip
					icon={<CalendarDays size={16} />}
					text={eventDate}
				/>

				{eventLocation && (
					<MetadataChip
						icon={<MapPin size={16} />}
						text={eventLocation}
					/>
				)}

				{participants && (
					<MetadataChip
						icon={<Users size={16} />}
						text={`${participants} Participants`}
					/>
				)}
			</div>

			{/* Description */}

			<div
				className="
                    whitespace-pre-wrap
                    text-lg
                    leading-9
                    text-neutral-300
                "
			>
				{expanded ? description : preview}
			</div>

			{/* Expand Button */}

			{description.length > 260 && (
				<button
					onClick={() => setExpanded(!expanded)}
					className="
                        mt-6
                        text-lg
                        font-medium
                        text-white
                        transition
                        hover:text-neutral-300
                    "
				>
					{expanded ? "Show Less" : "Show More"}
				</button>
			)}
		</section>
	);
}

interface MetadataChipProps {
	icon: React.ReactNode;

	text: string;
}

function MetadataChip({ icon, text }: MetadataChipProps) {
	return (
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
                text-sm
                text-neutral-300
            "
		>
			<span className="text-neutral-400">{icon}</span>

			{text}
		</div>
	);
}
