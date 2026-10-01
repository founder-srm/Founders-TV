"use client"; // This must be the first line of code

import { HeroSection } from "@/components/hero/hero-section";
import { Navbar } from "@/components/layout/navbar";
import { VideoGrid } from "@/components/video/video-grid";
import axios from "axios";
import { Video } from "@/components/video/video-grid";
import { useEffect, useState } from "react";
import { Collection } from "@/services/collections";

async function fetchVideos() {
	try {
		const response = await axios.get(
			process.env.NEXT_PUBLIC_APP_URL + "/api/videos/",
		);
		return response.data as Video[];
	} catch (e) {
		console.error("Error ", e);
		return null;
	}
}
async function fetchCollections() {
	try {
		const response = await axios.get("/api/collections/");
		return response.data as Collection[];
	} catch (e) {
		console.error("Error ", e);
		return [];
	}
}

const Home = () => {
	const [collections, setCollections] = useState<Collection[]>([]);
	const [videos, setVideos] = useState<Video[]>([]);

	useEffect(() => {
		fetchCollections().then(setCollections);
		fetchVideos().then((result) => setVideos(result ?? []));
	}, []);

	return (
		<main className="flex min-h-screen flex-col items-center pt-18 p-8">
			<Navbar collections={collections} />
			<HeroSection />
			<VideoGrid title="Watch More" videos={videos} />
		</main>
	);
};
export default Home;
