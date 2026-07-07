"use client";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

interface LogoutButtonProps {
	onLogout: () => Promise<void>;
}

export function LogoutButton({ onLogout }: LogoutButtonProps) {
	return (
		<Button
			variant="destructive"
			onClick={onLogout}
			className="
                h-12
                rounded-full
                px-8
                text-base
            "
		>
			<LogOut className="mr-2 h-5 w-5" />
			Logout
		</Button>
	);
}
