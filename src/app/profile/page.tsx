import { Navbar } from "@/components/layout/navbar";
import { LogoutButton } from "@/components/profile/logout-button";
import { ProfileCard } from "@/components/profile/profile-card";
import { getCurrentUser } from "@/lib/auth/current-user";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/auth/sign-in");
	}

	async function logout() {
		"use server";
		await auth.signOut();
		redirect("/");
	}

	return (
		<main
			className="
                mx-auto
                flex
                min-h-[80vh]
                max-w-2xl
                flex-col
                justify-center
                gap-8
                px-6
            "
		>
			<div className="text-center">
				<h1
					className="
                        mt-3
                        text-4xl
                        font-bold
                        text-white
                    "
				>
					My Profile
				</h1>

				<p
					className="
                        mt-4
                        text-neutral-400
                    "
				>
					Manage your Founders Club account.
				</p>
			</div>

			<ProfileCard name="Mohak Jain" email="mohakj500@gmail.com" />

			<div className="flex justify-center">
				<LogoutButton onLogout={logout} />
			</div>
		</main>
	);
}
