"use client";

import Image from "next/image";
import Link from "next/link";
import { UserCircle2 } from "lucide-react";

export function Navbar() {
	return (
		<header className="absolute top-0 left-0 z-50 w-full">
			<nav className="mx-auto flex h-18 w-full items-center justify-between px-8 lg:px-14">
				{/* Left Side */}
				<div className="flex items-center gap-12">
					{/* Logo */}
					<Link href="/" className="flex items-center">
						<Image
							src="/FCLogo.svg"
							alt="Founders Club"
							width={22}
							height={22}
						/>
					</Link>

					{/* Navigation */}
					<div className="flex items-center gap-10">
						<Link
							href="/"
							className="text-xl font-semibold text-white transition-opacity hover:opacity-75"
						>
							Home
						</Link>

						<Link
							href="/collections"
							className="text-xl font-medium text-white/90 transition-opacity hover:opacity-75"
						>
							Collections
						</Link>
					</div>
				</div>

				{/* Right Side */}
				<button
					className="rounded-full text-white transition-opacity hover:opacity-80"
					aria-label="Profile"
				>
					<UserCircle2 size={48} strokeWidth={1.75} />
				</button>
			</nav>
		</header>
	);
}
