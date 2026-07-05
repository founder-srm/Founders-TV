import { auth } from "./server";
import { CurrentUser } from "../../types/CurrentUser";

export async function getCurrentUser() : Promise<CurrentUser | null> {
    const session = await auth.getSession();
    if (session.error) {console.error(session.error); return null;}
    if (!session.data) {return null;}

    const {user} = session.data;
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image ?? null,
        emailVerified: user.emailVerified,
    };
}