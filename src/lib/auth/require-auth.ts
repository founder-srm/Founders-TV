import { getCurrentUser } from "./current-user";
import { CurrentUser } from "../../types/CurrentUser";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export async function requireAuth(): Promise<CurrentUser> {
    const user = await getCurrentUser();

    if (!user) {
        throw new UnauthorizedError();
    }

    return user;
}