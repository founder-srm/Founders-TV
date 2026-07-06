"use client";

import { Heart, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CommentCardProps {
	author: {
		id: string;
		name: string;
		image?: string | null;
	};
	content: string;
	createdAt: string;
	isOwner?: boolean;
	onUpdate?: (editedContent: string) => Promise<void>;
	onDelete?: () => void;
}

export function CommentCard({
	author,
	content,
	createdAt,
	isOwner = false,
	onUpdate,
	onDelete,
}: CommentCardProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [editedContent, setEditedContent] = useState(content);
	const [saving, setSaving] = useState(false);

	return (
		<article
			className="
                rounded-[28px]
                border
                border-white/10
                bg-white/[0.035]
                p-6
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-white/20
                w-full
            "
		>
			{/* Header */}

			<div className="flex items-start justify-between">
				<div className="flex items-center gap-4">
					<Avatar className="h-12 w-12">
						<AvatarImage src={author.image ?? undefined} />

						<AvatarFallback>{author.name[0]}</AvatarFallback>
					</Avatar>

					<div>
						<h4
							className="
                                text-lg
                                font-semibold
                                text-white
                            "
						>
							{author.name}
						</h4>

						<p
							className="
                                mt-1
                                text-sm
                                text-neutral-500
                            "
						>
							{createdAt}
						</p>
					</div>
				</div>

				{isOwner && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="
									rounded-full
									text-neutral-400
									hover:bg-white/5
									hover:text-white
								"
							>
								<MoreHorizontal className="h-5 w-5" />
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent
							align="end"
							className="
								w-48
								rounded-2xl
								border-white/10
								bg-background
								text-white
							"
						>
							<DropdownMenuItem
								onClick={() => setIsEditing(true)}
								className="cursor-pointer"
							>
								<Pencil className="mr-2 my-1 h-4 w-4" />
								Edit Comment
							</DropdownMenuItem>

							<DropdownMenuItem
								onClick={onDelete}
								className="
									cursor-pointer
									text-red-400
									focus:text-red-400
								"
							>
								<Trash2 className="mr-2 my-1 h-4 w-4" />
								Delete Comment
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>

			{/* Content */}

			{isEditing ? (
				<textarea
					value={editedContent}
					onChange={(e) => setEditedContent(e.target.value)}
					maxLength={100}
					rows={1}
					className="
						mt-6
						w-full
						resize-none
						rounded-2xl
						border
						border-white/10
						bg-white/5
						p-4
						text-lg
						leading-8
						text-white
						outline-none
						transition
						focus:border-white/30
					"
				/>
			) : (
				<div
					className="
						mt-6
						whitespace-pre-wrap
						text-lg
						leading-8
						text-neutral-300
					"
				>
					{content}
				</div>
			)}
			<div className="mt-8 flex items-center justify-between">
				{isEditing && (
					<div className="flex gap-3">
						<Button
							variant="ghost"
							onClick={() => {
								setEditedContent(content);

								setIsEditing(false);
							}}
						>
							Cancel
						</Button>

						<Button
							disabled={saving}
							onClick={async () => {
								if (!onUpdate) return;

								try {
									setSaving(true);
									await onUpdate(editedContent.trim());
									setSaving(false);
									setIsEditing(false);
								} catch {
									console.log("Unable to save comment");
								}
							}}
						>
							Save Changes
						</Button>
					</div>
				)}
			</div>
		</article>
	);
}
