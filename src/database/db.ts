import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schemas";

const databaseUrl = process.env.DATABASE_URL;

export const db = databaseUrl
  ? drizzle(neon(databaseUrl), { schema })
  : null;

export function assertDb() {
  if (!db) {
    throw new Error("DATABASE_URL is not set in the environment");
  }

  return db;
}