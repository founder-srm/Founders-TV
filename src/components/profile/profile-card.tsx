import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ProfileCardProps {
	name: string;

	email: string;
}

export function ProfileCard({ name, email }: ProfileCardProps) {
	const initials = name.trim().charAt(0).toUpperCase();

	return (
		<section
			className="
                rounded-[32px]
                border
                border-white/10
                bg-white/[0.035]
                p-12
                backdrop-blur-xl
            "
		>
			<div className="flex flex-col items-center">
				<Avatar
					className="
                        h-28
                        w-28
                        border
                        border-white/10
                        bg-white/5
                    "
				>
					<AvatarFallback
						className="
                            bg-transparent
                            text-5xl
                            font-bold
                            text-white
                        "
					>
						{initials}
					</AvatarFallback>
				</Avatar>

				<h1
					className="
                        mt-8
                        text-4xl
                        font-bold
                        text-white
                    "
				>
					{name}
				</h1>

				<p
					className="
                        mt-3
                        text-lg
                        text-neutral-400
                    "
				>
					{email}
				</p>
			</div>
		</section>
	);
}
