"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Search", href: "/search" },
  { label: "Collections", href: "/collections" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090909]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-end gap-2">
          <div className="leading-none">
            <span className="block text-[2rem] font-extrabold uppercase tracking-[-0.05em] text-white">
              FC<span className="text-[#ef2b2d]">TV</span>
            </span>
            <span className="block text-[9px] font-medium uppercase tracking-[0.22em] text-white/45">
              Frame. Stories. Memories.
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm font-semibold transition-colors duration-200",
                  active ? "text-[#ef2b2d]" : "text-white/85 hover:text-white"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-[29px] left-0 h-[2px] rounded-full bg-[#ef2b2d] transition-all duration-300",
                    active ? "w-full" : "w-0"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            aria-label="Toggle dark mode"
            className="h-10 w-10 rounded-full border border-white/10 bg-white/[0.03] text-white/85 transition-all duration-200 hover:bg-white/10 hover:text-white"
          >
            <Moon className="h-4 w-4" />
          </Button>

          <Button
            asChild
            type="button"
            size="icon"
            variant="ghost"
            aria-label="Search videos"
            className="h-10 w-10 rounded-full border border-white/10 bg-white/[0.03] text-white/85 transition-all duration-200 hover:bg-white/10 hover:text-white"
          >
            <Link href="/search">
              <Search className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
