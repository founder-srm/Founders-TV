import {boolean,integer,pgTable,text,timestamp,uuid,} from "drizzle-orm/pg-core";
import { user } from "./users";
import { collection } from "./collection";

export const video = pgTable("video", {
  id: uuid("id").primaryKey().defaultRandom(),
  youtubeId: text("youtube_id").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  thumbnailUrl: text("thumbnail_url"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  collectionId: uuid("collection_id").references(() => collection.id, {
    onDelete: "set null",
  }),
  createdById: uuid("created_by_id").references(() => user.id, {
    onDelete: "set null",
  }),
  viewCount: integer("view_count").notNull().default(0),
  likeCount: integer("like_count").notNull().default(0),
  commentCount: integer("comment_count").notNull().default(0),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Video = typeof video.$inferSelect;
export type NewVideo = typeof video.$inferInsert;
