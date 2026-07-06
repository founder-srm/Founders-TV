"use client";

import { useState } from "react";
import { SendHorizontal } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface CommentInputProps {
	user: {
		name: string;
		image?: string | null;
	};

	onSubmit: (comment: string) => Promise<void>;
}

const MAX_COMMENT_LENGTH = 100;

export function CommentInput({ user, onSubmit }: CommentInputProps) {
	const [comment, setComment] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit() {
		if (!comment.trim()) return;

		try {
			setLoading(true);

			await onSubmit(comment.trim());

			setComment("");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div
			className="
                rounded-[28px]
                border
                border-white/10
                bg-white/[0.04]
                p-6
                my-6
                backdrop-blur-xl
                w-full
            "
		>
			<div className="flex items-start gap-5">
				<Avatar className="h-12 w-12">
					<AvatarImage src={user.image ?? undefined} />

					<AvatarFallback>{user.name[0]}</AvatarFallback>
				</Avatar>

				<div className="flex-1">
					<textarea
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						placeholder="Share your thoughts about this event..."
						maxLength={MAX_COMMENT_LENGTH}
						rows={1}
						className="
                            w-full
                            resize-none
                            border-none
                            bg-transparent
                            text-lg
                            leading-8
                            text-white
                            outline-none
                            placeholder:text-neutral-500
                        "
					/>

					<div className="mt-5 flex items-center justify-between">
						<span
							className="
                                text-sm
                                text-neutral-500
                            "
						>
							{comment.length}/{MAX_COMMENT_LENGTH}
						</span>

						<Button
							onClick={handleSubmit}
							disabled={loading || comment.trim().length === 0}
							className="
                                h-12
                                rounded-full
                                px-6
                                text-base
                                bg-white
                            "
						>
							<SendHorizontal className="mr-2 h-4 w-4" />
							Comment
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
