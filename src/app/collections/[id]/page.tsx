import { CollectionDescription } from "@/components/collections/collection-description";
import { CollectionHero } from "@/components/collections/collection-hero";
import { CollectionMetadata } from "@/components/collections/collection-metadata";
import { CollectionVideoGrid } from "@/components/collections/collection-video-grid";
import { Navbar } from "@/components/layout/navbar";
import {
	getCollectionById,
	getCollectionVideos,
	getCollections,
} from "@/services/collections";
import { notFound } from "next/navigation";
import type { Video } from "@/services/videos";

interface CollectionPageProps {
	params: Promise<{ id: string }>;
}
export const dynamic = "force-dynamic";

export default async function CollectionPage({ params }: CollectionPageProps) {
	const { id } = await params;

	const collectionData = await getCollectionById(id);

	if (!collectionData) {
		notFound();
	}
	const collections = await getCollections();
	const collectionVideos = await getCollectionVideos(id) as Video[];

	return (
		<main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-10">
			<Navbar collections={collections} />
			<CollectionHero
				title={collectionData.name}
				subtitle={collectionData.description}
				heroImage={collectionData.thumbnail ?? ""}
				totalVideos={0}
				totalViews={0}
			/>

			<CollectionMetadata
				eventType={collectionData.event_type ?? ""}
				eventDate={collectionData.date?.toDateString() ?? ""}
				venue={collectionData.venue ?? ""}
				participants={collectionData.participants ?? 0}
				totalVideos={0}
				totalViews={0}
				totalLikes={0}
				totalComments={0}
			/>

			<CollectionDescription
				organizer={collectionData.organizer ?? ""}
				edition={collectionData.edition ?? ""}
				theme={collectionData.theme ?? ""}
				description={collectionData.detailInfo ?? ""}
			/>

			<CollectionVideoGrid videos={collectionVideos} />
		</main>
	);
}
