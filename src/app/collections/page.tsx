import Image from "next/image";
import CollectionCard from "@/components/CollectionCards";
import { Search, Trophy, Film } from "lucide-react";

function groupByCollection(videos: any[]) {
  const grouped: Record<string, any> = {};

  for (const video of videos) {
    const key = video.collectionId;

    if (!grouped[key]) {
      grouped[key] = {
        collectionId: video.collectionId,
        collectionName: video.collectionName,
        videos: [],
      };
    }

    grouped[key].videos.push(video);
  }

  return Object.values(grouped);
}

export default async function CollectionsPage() {
  const videos = [
    {
      id: "1",
      title: "event 1",
      thumbnailUrl: "/test.jpg",
      viewCount: 1200,
      collectionId: "a",
      collectionName: "hacathon",
    },
    {
      id: "2",
      title: "event 2",
      thumbnailUrl: "/test.jpg",
      viewCount: 3400,
      collectionId: "a",
      collectionName: "ideathon",
    },
    {
      id: "3",
      title: "event 3",
      thumbnailUrl: "/test.jpg",
      viewCount: 900,
      collectionId: "b",
      collectionName: "workshop",
    },
  ];

  const grouped = groupByCollection(videos);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0c1016] to-[#111827] text-white">

      {/* HERO */}
      <section className="relative h-[400px] overflow-hidden">
        <Image
          src="/pic.jpeg"
          alt="FCTV Hero"
          fill
          priority
          className="object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Hero Content */}
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">

          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#ef2b2d]">
            FCTV
          </p>

          <h1 className="text-5xl font-extrabold drop-shadow-lg">
            Collections
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-gray-300">
            Relive  every moment
          </p>

          {/* Search */}
          <div className="mt-8 flex w-full max-w-xl items-center rounded-full border border-white/20 bg-black/40 px-5 py-3 backdrop-blur-md transition-all duration-300 focus-within:border-[#ef2b2d]">
            <Search size={20} className="text-gray-300" />

            <input
              type="text"
              placeholder="Search collections..."
              className="ml-3 w-full bg-transparent text-white outline-none placeholder:text-gray-400"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 px-6 md:grid-cols-2">

        <div className="rounded-2xl border border-white/10 bg-[#151515] p-6 shadow-xl transition-all duration-300 hover:border-[#ef2b2d]/40 hover:shadow-red-500/20">
          <Trophy className="mb-4 text-[#ef2b2d]" size={32} />

          <h2 className="text-3xl font-bold">
            {grouped.length}
          </h2>

          <p className="text-gray-400">
            Collections
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#151515] p-6 shadow-xl transition-all duration-300 hover:border-[#ef2b2d]/40 hover:shadow-red-500/20">
          <Film className="mb-4 text-[#ef2b2d]" size={32} />

          <h2 className="text-3xl font-bold">
            {videos.length}
          </h2>

          <p className="text-gray-400">
            Videos
          </p>
        </div>

      </section>

      {/* Heading */}
      <section className="mx-auto mt-16 max-w-7xl px-6">
        <h2 className="text-3xl font-bold">
          Featured Collections
        </h2>

        <div className="mt-2 h-1 w-24 rounded-full bg-[#ef2b2d]" />

        <p className="mt-4 text-gray-400">
          Browse every event collections.
        </p>
      </section>

      {/* Cards */}
      <section className="mx-auto mt-10 max-w-7xl px-6 pb-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {grouped.map((group: any) => (
            <CollectionCard
              key={group.collectionId}
              title={group.collectionName}
              thumbnail={group.videos[0].thumbnailUrl}
              videoCount={group.videos.length}
              href={`/collections/${group.collectionId}`}
            />
          ))}
        </div>
      </section>

    </div>
  );
}