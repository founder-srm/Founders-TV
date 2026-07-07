"use client"; // This must be the first line of code

import { HeroSection } from "@/components/hero/hero-section";
import { Navbar } from "@/components/layout/navbar";
import { VideoGrid } from "@/components/video/video-grid";

const demoVideos = [
	{
		id: "1",
		title: "Club Wars",
		thumbnail: "/images/video1.jpg",
		views: 1307,
	},
];
const Home = () => {
	return (
		<main className="flex min-h-screen flex-col items-center pt-18 p-8">
			<Navbar />
			<HeroSection />
			<VideoGrid title="Watch More" videos={demoVideos} />
		</main>
	);
};
export default Home;
