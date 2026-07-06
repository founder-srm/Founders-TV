"use client";

import { MessageCircle } from "lucide-react";

import { CommentCard } from "./comment-card";
import { CommentInput } from "./comment-input";

interface User {
	name: string;
	image?: string | null;
}

export interface Comment {
	id: string;

	author: {
		id: string;
		name: string;
		image?: string | null;
	};

	content: string;

	createdAt: string;

	isOwner?: boolean;
}

interface CommentsSectionProps {
	currentUser?: User | null;

	comments: Comment[];

	totalComments: number;

	onSubmitComment?: (comment: string) => Promise<void>;

	onDeleteComment?: (commentId: string) => void;

	onLoadMore?: () => void;

	hasMore?: boolean;
}

export function CommentsSection({
	currentUser,
	comments,
	totalComments,
	onSubmitComment,
	onDeleteComment,
	onLoadMore,
	hasMore = false,
}: CommentsSectionProps) {
	return (
		<section className="space-y-8 w-full mt-6">
			{/* Header */}

			<div className="flex items-center gap-3">
				<MessageCircle className="text-neutral-300" size={28} />

				<h2
					className="
                        text-2xl
                        font-bold
                        tracking-tight
                        text-white
                    "
				>
					Discussion
				</h2>

				<span
					className="
                        rounded-full
                        border
                        border-white/10
                        bg-white/5
                        px-3
                        py-1
                        text-sm
                        text-neutral-400
                    "
				>
					{totalComments}
				</span>
			</div>

			{/* Comment Input */}

			{currentUser && onSubmitComment ? (
				<CommentInput user={currentUser} onSubmit={onSubmitComment} />
			) : (
				<div
					className="
                        rounded-[28px]
                        border
                        border-dashed
                        border-white/10
                        bg-white/3
                        p-10
                        text-center
                    "
				>
					<p
						className="
                            text-lg
                            text-neutral-400
                        "
					>
						Sign in to join the discussion.
					</p>
				</div>
			)}

			{/* Comments */}

			{comments.length === 0 ? (
				<div
					className="
                        rounded-[28px]
                        border
                        border-white/10
                        bg-white/3
                        py-20
                        text-center
                    "
				>
					<MessageCircle
						className="
                            mx-auto
                            mb-5
                            text-neutral-600
                        "
						size={44}
					/>

					<h3
						className="
                            text-2xl
                            font-semibold
                            text-white
                        "
					>
						Start the conversation
					</h3>

					<p
						className="
                            mt-2
                            text-neutral-400
                        "
					>
						Be the first person to share your thoughts about this
						event.
					</p>
				</div>
			) : (
				<div className="space-y-6">
					{comments.map((comment) => (
						<CommentCard
							key={comment.id}
							{...comment}
							onDelete={() => onDeleteComment?.(comment.id)}
						/>
					))}
				</div>
			)}

			{/* Load More */}

			{hasMore && (
				<div className="flex justify-center">
					<button
						onClick={onLoadMore}
						className="
                            rounded-full
                            border
                            border-white/10
                            bg-white/5
                            px-6
                            py-3
                            text-white
                            transition-all
                            duration-300
                            hover:bg-white/10
                        "
					>
						Load More Comments
					</button>
				</div>
			)}
		</section>
	);
}
