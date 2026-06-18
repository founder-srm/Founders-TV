import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { assertDb, db } from "@/database/db";
import * as schema from "@/database/schemas";

const authConfig = {
  secret:
    process.env.BETTER_AUTH_SECRET ??
    "change-me-in-production-with-a-long-random-secret",
  baseURL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  trustedOrigins: process.env.NEXT_PUBLIC_TRUSTED_ORIGINS?.split(",") ?? [],
  emailAndPassword: {
    enabled: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7,
    },
  },
};

export const auth = betterAuth(
  db
    ? {
        ...authConfig,
        database: drizzleAdapter(db, {
          provider: "pg",
          schema,
        }),
      }
    : authConfig,
);

export type AuthSession = Awaited<ReturnType<typeof auth.api.getSession>>;
export type AuthUser = NonNullable<AuthSession>['user'] & {
  role?: string;
};
