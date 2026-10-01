"use client";

import Link from "next/link";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import type { Collection } from "@/services/collections";

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
									<div>
										<h3
											className="
                                                font-semibold
                                                text-white
                                            "
										>
											{collection.name}
										</h3>

										<p
											className="
                                                mt-1
                                                text-sm
                                                text-neutral-400
                                            "
										>
											{collection.description}
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
