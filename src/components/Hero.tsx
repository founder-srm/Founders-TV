import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-5">
      <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#111214] shadow-2xl">
        <div className="grid min-h-[540px] grid-cols-1 lg:grid-cols-[1fr_1fr]">

          {/* LEFT SIDE */}
          <div className="relative flex items-center">
            <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0d0d0f] to-[#121214]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,43,45,0.18),transparent_35%)]" />

            <div className="relative z-10 px-8 py-12 sm:px-12">

              <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#ef2b2d]">
                FCTV
              </p>

              <h1 className="max-w-[10ch] text-[2.8rem] font-extrabold uppercase leading-[0.98] tracking-[-0.04em] sm:text-[3.8rem] lg:text-[4.5rem]">
                Capturing Moments.
                <span className="mt-2 block text-[#ef2b2d]">
                  Creating Memories.
                </span>
              </h1>

              <p className="mt-6 max-w-[36ch] text-[17px] leading-8 text-white/70">
                FC-TV is the official media club of our college, dedicated to
                capturing, creating and sharing stories that inspire.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">

                <Button
                  asChild
                  className="h-12 rounded-md bg-[#ef2b2d] px-6 text-sm font-semibold shadow-[0_15px_35px_rgba(239,43,45,0.35)] transition-all duration-300 hover:scale-105 hover:bg-[#ff3b3d]"
                >
                  <Link
                    href="/search"
                    className="inline-flex items-center gap-2"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    Watch Latest Video
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-md border-white/20 bg-transparent px-6 text-sm font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
                >
                  <Link
                    href="/collections"
                    className="inline-flex items-center gap-2"
                  >
                    Explore Videos
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

              </div>

              <div className="mt-14 flex items-center gap-3">
                <span className="h-[4px] w-10 rounded-full bg-[#ef2b2d]" />
                <span className="h-[4px] w-6 rounded-full bg-white" />
                <span className="h-[4px] w-6 rounded-full bg-white/40" />
              </div>

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative min-h-[400px] overflow-hidden lg:min-h-full">

            <Image
              src="/PIC1.jpeg"
              alt="FCTV Hero"
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/20" />

            {/* Red Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,43,45,0.15),transparent_70%)]" />

            {/* Bottom Fade */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#111214] to-transparent" />

          </div>

        </div>
      </div>
    </section>
  );
}