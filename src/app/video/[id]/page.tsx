import { notFound } from "next/navigation";

import { CommentsSection } from "@/components/watch/comments/comment-section";
import { Navbar } from "@/components/layout/navbar";
import { VideoDescription } from "@/components/watch/video-description";
import { VideoHeader } from "@/components/watch/video-header";
import { VideoPlayer } from "@/components/watch/video-player";

import { getCurrentUser } from "@/lib/auth/current-user";
import { getCollections } from "@/services/collections";

interface WatchProps {
	params: Promise<{ id: string }>;
}

interface VideoResponse {
	id: string;
	youtubeId: string;
	title: string;
	description: string | null;
	thumbnailUrl: string | null;
	publishedAt: string | Date | null;
	createdAt: string | Date;
	viewCount: number;
	likeCount: number;
	commentCount: number;
	collectionId: string | null;
	collectionName: string | null;
}

export const dynamic = "force-dynamic";

export default async function Watch({ params }: WatchProps) {
	const { id } = await params;

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_APP_URL}/api/videos/${id}`,
		{
			cache: "no-store",
		},
	);

	if (!response.ok) {
		if (response.status === 404) {
			notFound();
		}

		throw new Error("Failed to fetch video");
	}

	const video: VideoResponse = await response.json();

	const currentUser = await getCurrentUser();

	const uploadedAt = new Date(
		video.publishedAt ?? video.createdAt,
	).toLocaleDateString("en-IN", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
	const collections = await getCollections();

	return (
		<main className="flex min-h-screen flex-col items-center pt-18 p-8">
			<Navbar collections={collections}/>

			<VideoPlayer youtubeId={video.youtubeId} title={video.title} />

			<VideoHeader
				title={video.title}
				collection={video.collectionName ?? "Founders Club"}
				views={video.viewCount}
				likes={video.likeCount}
				videoId={id}
				isSignedIn={!!currentUser}
				comments={video.commentCount}
				uploadedAt={uploadedAt}
			/>

			<VideoDescription
				description={
					video.description ??
					"No description available for this video."
				}
				eventDate={uploadedAt}
				eventLocation="SRM Nagar, Kattankulathur, Tamil Nadu"
				participants={0}
			/>

			<CommentsSection currentUser={currentUser} videoId={id} />
		</main>
	);
}
