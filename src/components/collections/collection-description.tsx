"use client";

import { useMemo, useState } from "react";

interface CollectionDescriptionProps {
	description: string;

	organizer: string;

	edition: string;

	theme: string;

	prizePool?: string;
}

export function CollectionDescription({
	description,
	organizer,
	edition,
	theme,
	prizePool,
}: CollectionDescriptionProps) {
	const [expanded, setExpanded] = useState(false);

	const preview = useMemo(() => {
		if (description.length <= 350) return description;

		return description.slice(0, 350) + "...";
	}, [description]);

	return (
		<section
			className="
                rounded-[32px]
                border
                border-white/10
                bg-white/[0.035]
                p-8
                backdrop-blur-xl
            "
		>
			<div
				className="
                    grid
                    gap-10
                    lg:grid-cols-[2fr_1fr]
                "
			>
				{/* Left */}

				<div>
					<p
						className="
                            whitespace-pre-wrap
                            text-lg
                            leading-9
                            text-neutral-300
                        "
					>
						{expanded ? description : preview}
					</p>

					{description.length > 350 && (
						<button
							onClick={() => setExpanded(!expanded)}
							className="
                                mt-8
                                rounded-full
                                border
                                border-white/10
                                bg-white/5
                                px-5
                                py-2
                                text-sm
                                font-medium
                                text-white
                                transition
                                hover:bg-white/10
                            "
						>
							{expanded ? "Show Less" : "Show More"}
						</button>
					)}
				</div>

				{/* Right */}

				<div
					className="
                        space-y-6
                    "
				>
					<InfoRow label="Organized by" value={organizer} />

					<InfoRow label="Edition" value={edition} />

					<InfoRow label="Theme" value={theme} />

					{prizePool && (
						<InfoRow label="Prize Pool" value={prizePool} />
					)}
				</div>
			</div>
		</section>
	);
}

interface InfoRowProps {
	label: string;
	value: string;
}

function InfoRow({ label, value }: InfoRowProps) {
	return (
		<div
			className="
                border-b
                border-white/10
                pb-4
            "
		>
			<div
				className="
                    text-sm
                    uppercase
                    tracking-widest
                    text-neutral-500
                "
			>
				{label}
			</div>

			<div
				className="
                    mt-2
                    text-lg
                    font-medium
                    text-white
                "
			>
				{value}
			</div>
		</div>
	);
}
