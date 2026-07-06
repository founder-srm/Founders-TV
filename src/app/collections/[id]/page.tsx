import { CollectionDescription } from "@/components/collections/collection-description";
import { CollectionHero } from "@/components/collections/collection-hero";
import { CollectionMetadata } from "@/components/collections/collection-metadata";
import { CollectionVideoGrid } from "@/components/collections/collection-video-grid";
import { Navbar } from "@/components/layout/navbar";
export default function CollectionPage() {
	return (
		<main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-10">
			<Navbar />
			<CollectionHero
				title="Foundathon 3.0"
				subtitle="The Annual Flagship Hackathon of Founders Club"
				heroImage="/images/new.jpg"
				totalVideos={12}
				totalViews={24318}
			/>

			<CollectionMetadata
				eventType="Hackathon"
				eventDate="26–27 April 2026"
				venue="SRM Institute of Science & Technology"
				participants={312}
				totalVideos={12}
				totalViews={24318}
				totalLikes={1832}
				totalComments={246}
			/>

			<CollectionDescription
				organizer="Founders Club"
				edition="3rd Edition"
				theme="Build. Launch. Impact."
				prizePool="₹1,00,000"
				description={`
Foundathon 3.0 was the flagship hackathon organized by the Founders Club, bringing together over 300 participants from different engineering disciplines to build innovative products within 24 hours.

Throughout the event, students attended keynote sessions, participated in mentor reviews, pitched their ideas before judges, and showcased projects spanning AI, Web Development, Robotics, and Entrepreneurship.

This collection preserves the complete journey of Foundathon 3.0—from the opening ceremony and team formation all the way to the final presentations and winner announcements.
`}
			/>

			<CollectionVideoGrid
				videos={[
					{
						id: "1",
						title: "Opening Ceremony",
						thumbnail: "/images/clubWars.jpg",
						duration: "12:42",
						views: 2431,
					},
					{
						id: "2",
						title: "Problem Statement Reveal",
						thumbnail: "/images/clubWars.jpg",
						duration: "18:11",
						views: 1987,
					},
					{
						id: "3",
						title: "Mentor Session Highlights",
						thumbnail: "/images/clubWars.jpg",
						duration: "15:04",
						views: 1732,
					},
					{
						id: "4",
						title: "Final Pitch Presentations",
						thumbnail: "/images/clubWars.jpg",
						duration: "27:35",
						views: 3145,
					},
					{
						id: "5",
						title: "Awards Ceremony",
						thumbnail: "/images/clubWars.jpg",
						duration: "14:58",
						views: 2803,
					},
					{
						id: "6",
						title: "Aftermovie",
						thumbnail: "/images/clubWars.jpg",
						duration: "08:24",
						views: 4125,
					},
				]}
			/>
		</main>
	);
}
