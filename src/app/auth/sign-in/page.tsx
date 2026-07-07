"use client";

import Link from "next/link";
import { useActionState } from "react";

import { signInWithEmail } from "./actions";

export default function SignInForm() {
	const [state, formAction, isPending] = useActionState(
		signInWithEmail,
		null,
	);

	return (
		<main
			className="
                flex
                min-h-screen
                items-center
                justify-center
                bg-background
                px-6
            "
		>
			<form
				action={formAction}
				className="
                    w-full
                    max-w-md
                    rounded-[32px]
                    border
                    border-white/10
                    bg-white/[0.035]
                    p-10
                    backdrop-blur-xl
                "
			>
				<div className="text-center">
					<h2
						className="
                            text-3xl
                            font-bold
                            text-white
                        "
					>
						Welcome Back
					</h2>

					<p
						className="
                            mt-3
                            text-neutral-400
                        "
					>
						Sign in to continue watching Founders Club content.
					</p>
				</div>

				<div className="mt-5 space-y-6">
					<div>
						<label
							htmlFor="email"
							className="
                                mb-2
                                block
                                text-sm
                                font-medium
                                text-neutral-300
                            "
						>
							Email Address
						</label>

						<input
							id="email"
							name="email"
							type="email"
							required
							placeholder="john@example.com"
							className="
                                h-12
                                w-full
                                rounded-xl
                                border
                                border-white/10
                                bg-white/5
                                px-4
                                text-white
                                placeholder:text-neutral-500
                                outline-none
                                transition
                                focus:border-white/30
                            "
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="
                                mb-2
                                block
                                text-sm
                                font-medium
                                text-neutral-300
                            "
						>
							Password
						</label>

						<input
							id="password"
							name="password"
							type="password"
							required
							placeholder="••••••••"
							className="
                                h-12
                                w-full
                                rounded-xl
                                border
                                border-white/10
                                bg-white/5
                                px-4
                                text-white
                                placeholder:text-neutral-500
                                outline-none
                                transition
                                focus:border-white/30
                            "
						/>
					</div>
				</div>

				{state?.error && (
					<div
						className="
                            mt-6
                            rounded-xl
                            border
                            border-red-500/20
                            bg-red-500/10
                            p-3
                            text-sm
                            text-red-400
                        "
					>
						{state.error}
					</div>
				)}

				<button
					type="submit"
					disabled={isPending}
					className="
                        mt-8
                        h-12
                        w-full
                        rounded-full
                        bg-white
                        font-semibold
                        text-black
                        transition
                        hover:bg-neutral-200
                        disabled:opacity-50
                    "
				>
					{isPending ? "Signing In..." : "Sign In"}
				</button>

				<p
					className="
                        mt-8
                        text-center
                        text-sm
                        text-neutral-400
                    "
				>
					Don't have an account?{" "}
					<Link
						href="/auth/sign-up"
						className="
                            font-medium
                            text-white
                            hover:underline
                        "
					>
						Create one
					</Link>
				</p>
			</form>
		</main>
	);
}
