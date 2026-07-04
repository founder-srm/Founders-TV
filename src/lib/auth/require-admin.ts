import { eq } from "drizzle-orm";
import { redirect as nextRedirect } from "next/navigation";

import { user } from "../../database/schemas/users";
import { db } from "../../database/db";
import { requireAuth } from "./require-auth";

import { getApplicationUser } from "./application-user";
import { ForbiddenError } from "../errors/ForbiddenError";

export async function requireAdmin() {
    const currentUser = await requireAuth();

    const applicationUser = await getApplicationUser(currentUser);

    if (applicationUser.role.toUpperCase() !== "ADMIN") {
        throw new ForbiddenError();
    }

    return applicationUser;
}