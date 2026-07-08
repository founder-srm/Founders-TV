"use client";

import Hero from "@/components/Hero";
import LatestVideos from "@/components/LatestVideos";
import CollectionCard from "@/components/CollectionCards";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import {
  Film,
  Play,
  Users,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

type VideoLike = {
  id?: string | number;
  title?: string;
  description?: string | null;
  thumbnailUrl?: string | null;
  createdAt?: string | Date | null;
  category?: string | null;
  viewCount?: number | null;
  collectionName?: string | null;
};

type HomeClientProps = {
  videos: VideoLike[];
};

const defaultCollections = [
  {
    id: "events",
    title: "Events",
    thumbnail:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
    count: 24,
    href: "/collections",
  },
  {
    id: "workshops",
    title: "Workshops",
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    count: 12,
    href: "/collections",
  },
  {
    id: "competitions",
    title: "Competitions",
    thumbnail:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop",
    count: 9,
    href: "/collections",
  },
  {
    id: "behind-the-scenes",
    title: "Behind the Scenes",
    thumbnail:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
    count: 18,
    href: "/collections",
  },
];

const stats = [
  {
    id: "videos",
    label: "Videos",
    value: "150+",
    icon: Film,
  },
  {
    id: "members",
    label: "Members",
    value: "50+",
    icon: Users,
  },
  {
    id: "years",
    label: "Years",
    value: "8+",
    icon: CalendarDays,
  },
  {
    id: "views",
    label: "Views",
    value: "1M+",
    icon: Play,
  },
];

export default function HomeClient({ videos }: HomeClientProps) {
  const latestVideos = videos.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0b0b0c] text-white">
      <Navbar />

      <main className="mx-auto max-w-[1440px] px-4 pb-0 sm:px-6 lg:px-8">
        <Hero />

        <LatestVideos videos={latestVideos} />

        {/* Collections */}
        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-7 w-[3px] rounded-full bg-[#ef2b2d]" />

              <h2 className="text-xl font-bold uppercase sm:text-2xl">
                Collections
              </h2>
            </div>

            <Button asChild variant="ghost" className="group">
              <Link
                href="/collections"
                className="flex items-center gap-2"
              >
                View All
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {defaultCollections.map((collection) => (
              <CollectionCard
                key={collection.id}
                title={collection.title}
                thumbnail={collection.thumbnail}
                videoCount={collection.count}
                href={collection.href}
              />
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mt-10 mb-12">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.id}
                  className="rounded-xl border border-white/10 bg-[#111214] p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-[#ef2b2d]/10 p-3">
                      <Icon className="h-5 w-5 text-[#ef2b2d]" />
                    </div>

                    <div>
                      <h3 className="text-3xl font-bold">
                        {stat.value}
                      </h3>

                      <p className="text-sm text-white/60">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}