import { eq } from "drizzle-orm";

import { db } from "@/database/db";
import { user } from "@/database/schemas/users";
import { CurrentUser } from "../../types/CurrentUser";
import { NotFoundError } from "../errors/NotFoundError";

export async function getApplicationUser(currentUser: CurrentUser) {
    // Ensure the user exists in our application database
    await db?.insert(user).values({
            id: currentUser.id,
            email: currentUser.email,
            name: currentUser.name,
            image: currentUser.image,
            emailVerified: currentUser.emailVerified,
            role: "USER",
        })
        .onConflictDoUpdate({
            target: user.id,
            set: {
                email: currentUser.email,
                name: currentUser.name,
                image: currentUser.image,
                emailVerified: currentUser.emailVerified,
            },
        });

    // Return the application user
    const applicationUser = await db?.query.user.findFirst({
        where: eq(user.id, currentUser.id),
    });

    if (!applicationUser) {
        throw new NotFoundError();
    }

    return applicationUser;
}