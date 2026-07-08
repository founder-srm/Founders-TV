import Link from "next/link";
import { Search, Moon, Sun, Play } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Search", href: "/search" },
  { label: "Collections", href: "/collections" },
];

const categories = [
  "Events",
  "Workshops",
  "Competitions",
  "Documentaries",
  "Interviews",
  "Behind the Scenes",
];

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10 bg-[#090909]">
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Logo */}
          <div>
            <div className="leading-none">
              <span className="block text-3xl font-extrabold text-white">
                <span className="text-[#ef2b2d]">FC</span>-TV
              </span>

              <span className="mt-1 block text-[10px] uppercase tracking-[0.25em] text-white/50">
                Frame. Stories. Memories.
              </span>
            </div>

            <p className="mt-5 text-sm leading-7 text-white/65">
              FC-TV is the official media club dedicated to preserving unforgettable
              campus moments through photography and videography.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">
              Quick Links
            </h3>

            <div className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-white/65 transition hover:text-[#ef2b2d]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">
              Categories
            </h3>

            <div className="mt-4 space-y-3">
              {categories.map((category) => (
                <p key={category} className="text-sm text-white/65">
                  {category}
                </p>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">
              Follow Us
            </h3>

            <div className="mt-4 flex gap-3">
              {[Search, Moon, Sun, Play].map((Icon, index) => (
                <button
                  key={index}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#ef2b2d] hover:text-[#ef2b2d]"
                >
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>

            <p className="mt-5 text-sm leading-7 text-white/65">
              Stay connected with FC-TV for the latest campus stories and updates.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-white/50">
          © 2026 FC-TV. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}