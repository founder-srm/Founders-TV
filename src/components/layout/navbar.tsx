"use client";

import Image from "next/image";
import Link from "next/link";
import { UserCircle2 } from "lucide-react";
import { CollectionsDropdown } from "./collections-dropdown";
import { redirect } from "next/navigation";
import { Collection } from "@/services/collections";

interface NavbarProps {
	collections?: Collection[];
}
export function Navbar({ collections = [] }: NavbarProps) {
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
							className="text-lg font-semibold text-white transition-opacity hover:opacity-75"
						>
							Home
						</Link>

						<CollectionsDropdown collections={collections} />
					</div>
				</div>

				{/* Right Side */}
				<button
					className="rounded-full text-white transition-opacity hover:opacity-80"
					aria-label="Profile"
					onClick={() => redirect("/profile")}
				>
					<UserCircle2 size={48} strokeWidth={1.75} />
				</button>
			</nav>
		</header>
	);
}
