import { createNeonAuth } from "@neondatabase/auth/next/server";

const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL!,
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET!,
  },
});

console.log(auth);

export { auth };