import {boolean,integer,pgTable,text,timestamp,uuid,} from "drizzle-orm/pg-core";
import { user } from "./users";

export const collection = pgTable("collection", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  thumbnail: text("thumbnail").default(""),
  createdById: uuid("created_by_id").references(() => user.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Collection = typeof collection.$inferSelect;
export type NewCollection = typeof collection.$inferInsert;