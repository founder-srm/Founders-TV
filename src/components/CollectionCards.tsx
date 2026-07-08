import Link from "next/link";
import Image from "next/image";
import { Layers3 } from "lucide-react";

type CollectionCardProps = {
  title: string;
  thumbnail: string;
  videoCount: number;
  href: string;
};

export default function CollectionCard({
  title,
  thumbnail,
  videoCount,
  href,
}: CollectionCardProps) {
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-[18px] border border-white/10 bg-[#111214] shadow-[0_10px_30px_rgba(0,0,0,0.24)] transition-all duration-300 hover:-translate-y-1.5 hover:border-white/15 hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
    >
      <div className="relative aspect-[1.4/1] overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      </div>

      <div className="flex items-center justify-between px-4 py-4">
        <div>
          <h3 className="text-[17px] font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-[#ef2b2d]">
            {title}
          </h3>
          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/50">
            {videoCount} Videos
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ef2b2d]/20 bg-[#ef2b2d]/10 text-[#ef2b2d]">
          <Layers3 className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
