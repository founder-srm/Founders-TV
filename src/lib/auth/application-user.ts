import { db } from "@/database/db";
import { user } from "@/database/schemas/users";
import { CurrentUser } from "../../types/CurrentUser";

// Lightweight sync: creates the application user row on first authenticated
// request and leaves existing rows (including their role) untouched.
export async function ensureApplicationUser(currentUser: CurrentUser) {
    await db
        ?.insert(user)
        .values({
            id: currentUser.id,
            email: currentUser.email,
            name: currentUser.name,
            image: currentUser.image,
            emailVerified: currentUser.emailVerified,
            role: "USER",
        })
        .onConflictDoNothing({ target: user.id });
}
