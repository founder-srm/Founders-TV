"use client";

import {
	Calendar,
	Eye,
	Heart,
	MessageCircle,
	Share2,
	MoreHorizontal,
	Trophy,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface VideoHeaderProps {
	title: string;
	collection: string;

	views: number;
	likes: number;
	comments: number;

	uploadedAt: string;
}

export function VideoHeader({
	title,
	collection,
	views,
	likes,
	comments,
	uploadedAt,
}: VideoHeaderProps) {
	return (
		<section className="space-y-6 py-8 w-full">
			{/* Title */}

			<div className="space-y-4">
				<h1 className="text-3xl font-bold tracking-tight text-white">
					{title}
				</h1>

				<Badge
					className="
                        rounded-full
                        border
                        border-yellow-400/30
                        bg-yellow-500/10
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        tracking-wide
                        text-yellow-300
                    "
				>
					<Trophy className="mr-2 h-4 w-4" />
					{collection}
				</Badge>
			</div>

			{/* Bottom Row */}

			<div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
				{/* Analytics */}

				<div className="flex flex-wrap items-center gap-3">
					<StatPill
						icon={<Eye size={16} />}
						value={views.toLocaleString()}
						label="Views"
					/>

					<StatPill
						icon={<Heart size={16} />}
						value={likes.toLocaleString()}
						label="Likes"
					/>

					<StatPill
						icon={<MessageCircle size={16} />}
						value={comments.toLocaleString()}
						label="Comments"
					/>

					<StatPill
						icon={<Calendar size={16} />}
						value={uploadedAt}
					/>
				</div>

				{/* Actions */}

				<div className="flex items-center gap-3">
					<GlassButton>
						<Heart className="h-5 w-5" />
					</GlassButton>

					<GlassButton>
						<Share2 className="h-5 w-5" />
					</GlassButton>

					<GlassButton>
						<MoreHorizontal className="h-5 w-5" />
					</GlassButton>
				</div>
			</div>
		</section>
	);
}

interface StatPillProps {
	icon: React.ReactNode;
	value: string;
	label?: string;
}

function StatPill({ icon, value, label }: StatPillProps) {
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
                backdrop-blur-md
            "
		>
			<span className="text-neutral-400">{icon}</span>

			<span className="font-semibold text-white">{value}</span>

			{label && <span className="text-neutral-400">{label}</span>}
		</div>
	);
}

interface GlassButtonProps {
	children: React.ReactNode;
}

function GlassButton({ children }: GlassButtonProps) {
	return (
		<Button
			size="icon"
			variant="ghost"
			className="
                h-12
                w-12
                rounded-full
                border
                border-white/10
                bg-white/5
                text-white
                backdrop-blur-md
                transition-all
                duration-300
                hover:scale-105
                hover:bg-white/10
            "
		>
			{children}
		</Button>
	);
}
