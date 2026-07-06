"use client";

import { VideoPlayer } from "../../../components/watch/video-player";
import { VideoHeader } from "../../../components/watch/video-header";
import { VideoDescription } from "../../../components/watch/video-description";
import { Navbar } from "../../../components/layout/navbar";
import { CommentsSection } from "@/components/watch/comments/comment-section";
import { Comment } from "@/components/watch/comments/comment-section";

const comments: Comment[] = [
	{
		id: "1",
		author: { id: "1", name: "John Doe", image: null },
		content: "Great video!",
		createdAt: "2023-10-01T12:00:00Z",
		isOwner: true,
	},
	{
		id: "2",
		author: { id: "2", name: "Jane Smith", image: null },
		content: "I learned a lot from this.",
		createdAt: "2023-10-02T14:30:00Z",
		isOwner: false,
	},
];

export default function Watch() {
	return (
		<main className="flex min-h-screen flex-col items-center pt-18 p-8">
			<Navbar />
			<VideoPlayer
				youtubeId="https://youtu.be/M1E4ZzdpOco?si=bxr4gcvVKDM-u8tn"
				title="Foundathon 3"
			/>
			<VideoHeader
				title="Foundathon 3.0"
				collection="Foundathon"
				views={0}
				likes={0}
				comments={0}
				uploadedAt="10 October 2026"
			/>
			<VideoDescription
				description="Foundathon 3.0 is a 48-hour hackathon where participants come together to build innovative solutions to real-world problems. This event is designed to foster creativity, collaboration, and entrepreneurship among developers, designers, and business enthusiasts. Participants will have the opportunity to work in teams, receive mentorship from industry experts, and showcase their projects to a panel of judges for a chance to win exciting prizes."
				eventDate="10 October 2026"
				eventLocation="SRM Nagar, Kattankulathur, Tamil Nadu"
				participants={150}
			/>
			<CommentsSection
				currentUser={{ name: "John Doe", image: null }}
				comments={comments}
				totalComments={comments.length}
				onSubmitComment={async (comment) => {
					// Handle comment submission logic here
					console.log("New comment submitted:", comment);
				}}
			/>
		</main>
	);
}
