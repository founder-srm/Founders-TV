import Link from "next/link";
import Image from "next/image";

type VideoLike = {
  id?: string | number;
  title?: string;
  description?: string | null;
  thumbnailUrl?: string | null;
  thumbnail?: string | null;
  image?: string | null;
  coverImage?: string | null;
  slug?: string | null;
  duration?: string | null;
  createdAt?: string | Date | null;
  category?: string | null;
};

type VideoCardProps = {
  video: VideoLike;
};

function formatDate(dateValue?: string | Date | null) {
  if (!dateValue) return "Recent";

  const date =
    typeof dateValue === "string"
      ? new Date(dateValue)
      : dateValue;

  if (Number.isNaN(date.getTime())) return "Recent";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getImage(video: VideoLike) {
  return (
    video.thumbnailUrl ||
    video.thumbnail ||
    video.image ||
    video.coverImage ||
    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop"
  );
}

function getHref(video: VideoLike) {
  if (video.slug) {
    return `/search?q=${encodeURIComponent(video.slug)}`;
  }

  return "/search";
}

export default function VideoCard({ video }: VideoCardProps) {
  const title = video.title || "Untitled Video";
  const image = getImage(video);
  const category = video.category || "Event";
  const duration = video.duration || "03:45";
  const date = formatDate(video.createdAt);
  const href = getHref(video);

  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-[18px] border border-white/10 bg-[#111214] shadow-[0_10px_30px_rgba(0,0,0,0.24)] transition-all duration-300 hover:-translate-y-1.5 hover:border-white/15 hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
    >
      <div className="relative aspect-[1.35/1] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="absolute bottom-3 right-3 rounded bg-black/80 px-2 py-1 text-xs font-semibold text-white">
          {duration}
        </div>
      </div>

      <div className="p-4">
        <h3 className="line-clamp-2 text-lg font-semibold text-white transition-colors group-hover:text-[#ef2b2d]">
          {title}
        </h3>

        <div className="mt-3 flex items-center gap-2 text-xs text-white/60">
          <span>{category}</span>
          <span>•</span>
          <span>{date}</span>
        </div>
      </div>
    </Link>
  );
}