import { timingSafeEqual } from "node:crypto";

import { UnauthorizedError } from "../errors/UnauthorizedError";

// Guards CMS write endpoints with a shared secret sent as
// `Authorization: Bearer <CMS_API_KEY>`.
export async function requireApiKey(request: Request) {
    const expected = process.env.CMS_API_KEY;

    // Fail closed if the key was never configured.
    if (!expected) {
        throw new UnauthorizedError();
    }

    const header = request.headers.get("authorization") ?? "";
    const provided = header.startsWith("Bearer ") ? header.slice(7) : "";

    const a = Buffer.from(provided);
    const b = Buffer.from(expected);

    if (a.length !== b.length || !timingSafeEqual(a, b)) {
        throw new UnauthorizedError();
    }
}
