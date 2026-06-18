import { integer, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { collection, video } from "./content";

export const videoView = pgTable("video_view", {
  id: uuid("id").primaryKey().defaultRandom(),
  videoId: uuid("video_id")
    .notNull()
    .references(() => video.id, { onDelete: "cascade" }),
  userId: uuid("user_id").references(() => user.id, { onDelete: "set null" }),
  viewedAt: timestamp("viewed_at", { withTimezone: true }).notNull().defaultNow(),
});

export const collectionView = pgTable("collection_view", {
  id: uuid("id").primaryKey().defaultRandom(),
  collectionId: uuid("collection_id")
    .notNull()
    .references(() => collection.id, { onDelete: "cascade" }),
  userId: uuid("user_id").references(() => user.id, { onDelete: "set null" }),
  viewedAt: timestamp("viewed_at", { withTimezone: true }).notNull().defaultNow(),
});
