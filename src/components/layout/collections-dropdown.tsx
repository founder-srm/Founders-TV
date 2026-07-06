"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface Collection {
	id: string;
	title: string;
	subtitle: string;
	emoji: string;
}

interface CollectionsDropdownProps {
	collections: Collection[];
}

export function CollectionsDropdown({ collections }: CollectionsDropdownProps) {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger
						className="
                            text-lg font-semibold text-white transition-opacity hover:opacity-75
                        "
					>
						Collections
					</NavigationMenuTrigger>

					<NavigationMenuContent>
						<div
							className="
                                w-90
                                border-none
								border-0
                                bg-background
                            "
						>
							{collections.map((collection) => (
								<Link
									key={collection.id}
									href={`/collections/${collection.id}`}
									className="
                                        flex
                                        items-start
                                        gap-4
                                        rounded-xl
                                        p-4
                                        transition-colors
                                        hover:bg-white/5
                                    "
								>
									<div className="text-2xl">
										{collection.emoji}
									</div>

									<div>
										<h3
											className="
                                                font-semibold
                                                text-white
                                            "
										>
											{collection.title}
										</h3>

										<p
											className="
                                                mt-1
                                                text-sm
                                                text-neutral-400
                                            "
										>
											{collection.subtitle}
										</p>
									</div>
								</Link>
							))}
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
