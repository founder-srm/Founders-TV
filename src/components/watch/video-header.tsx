"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
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
	videoId: string;
	isSignedIn: boolean;
	comments: number;

	uploadedAt: string;
}

export function VideoHeader({
	title,
	collection,
	views,
	likes,
	videoId,
	isSignedIn,
	comments,
	uploadedAt,
}: VideoHeaderProps) {
	const router = useRouter();
	const [liked, setLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(likes);
	const [pending, setPending] = useState(false);

	// Ask the API whether the signed-in user has already liked this video.
	useEffect(() => {
		if (!isSignedIn) {
			setLiked(false);
			return;
		}

		let cancelled = false;

		axios
			.get<{ liked: boolean }>(`/api/videos/${videoId}/like`)
			.then((response) => {
				if (!cancelled) setLiked(response.data.liked);
			})
			.catch((error) => {
				console.error("Error fetching like status:", error);
			});

		return () => {
			cancelled = true;
		};
	}, [videoId, isSignedIn]);

	async function toggleLike() {
		if (!isSignedIn) {
			router.push("/auth/sign-in");
			return;
		}

		if (pending) return;

		const nextLiked = !liked;

		// Optimistic update, rolled back if the request fails.
		setPending(true);
		setLiked(nextLiked);
		setLikeCount((count) => count + (nextLiked ? 1 : -1));

		try {
			if (nextLiked) {
				await axios.post(`/api/videos/${videoId}/like`);
			} else {
				await axios.delete(`/api/videos/${videoId}/like`);
			}
		} catch (error) {
			console.error("Error updating like:", error);
			setLiked(!nextLiked);
			setLikeCount((count) => count + (nextLiked ? -1 : 1));
		} finally {
			setPending(false);
		}
	}

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
						value={likeCount.toLocaleString()}
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
					<GlassButton
						onClick={toggleLike}
						disabled={pending}
						label={liked ? "Unlike video" : "Like video"}
					>
						<Heart
							className={`h-5 w-5 ${
								liked ? "fill-red-500 text-red-500" : ""
							}`}
						/>
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
	onClick?: () => void;
	disabled?: boolean;
	label?: string;
}

function GlassButton({
	children,
	onClick,
	disabled,
	label,
}: GlassButtonProps) {
	return (
		<Button
			onClick={onClick}
			disabled={disabled}
			aria-label={label}
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
