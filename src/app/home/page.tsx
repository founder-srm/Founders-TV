"use client"; // This must be the first line of code

import { HeroSection } from "@/components/hero/hero-section";
import { Navbar } from "@/components/layout/navbar";
import { VideoGrid } from "@/components/video/video-grid";

const demoVideos = [
	{
		id: "1",
		title: "Club Wars",
		thumbnail: "/images/clubWars.jpg",
		views: 1307,
	},
	{
		id: "2",
		title: "Club Wars",
		thumbnail: "/images/clubWars.jpg",
		views: 1307,
	},
	{
		id: "3",
		title: "Club Wars",
		thumbnail: "/images/clubWars.jpg",
		views: 1307,
	},
	{
		id: "4",
		title: "Club Wars",
		thumbnail: "/images/clubWars.jpg",
		views: 1307,
	},
	{
		id: "5",
		title: "Club Wars",
		thumbnail: "/images/clubWars.jpg",
		views: 1307,
	},
	{
		id: "6",
		title: "Club Wars",
		thumbnail: "/images/clubWars.jpg",
		views: 1307,
	},
];

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center pt-18 p-8">
			<Navbar />
			<HeroSection />
			<VideoGrid title="Trending Videos" videos={demoVideos} />
		</main>
	);
}
