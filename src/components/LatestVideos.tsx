import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import VideoCard from "@/components/VideoCard";

type VideoLike = {
  id?: string | number;
  title?: string;
  description?: string | null;
  thumbnail?: string | null;
  image?: string | null;
  coverImage?: string | null;
  slug?: string | null;
  duration?: string | null;
  createdAt?: string | Date | null;
  category?: string | null;
};

type LatestVideosProps = {
  videos: VideoLike[];
};

export default function LatestVideos({ videos }: LatestVideosProps) {
  return (
    <section className="mt-10">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-7 w-[3px] rounded-full bg-[#ef2b2d]" />
          <h2 className="text-xl font-bold uppercase tracking-tight text-white sm:text-2xl">
            Latest Videos
          </h2>
        </div>

        <Button
          asChild
          variant="ghost"
          className="group h-auto px-0 text-sm font-semibold text-[#ef2b2d] hover:bg-transparent hover:text-white"
        >
          <Link href="/search" className="inline-flex items-center gap-2">
            View All
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {videos.map((video, index) => (
          <VideoCard
            key={String(video.id ?? index)}
            video={video}
          />
        ))}
      </div>
    </section>
  );
}
