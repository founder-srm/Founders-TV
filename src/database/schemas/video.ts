import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const video = pgTable("video", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    url : text("url").notNull().unique(),
});

export type Video = typeof video.$inferSelect;
export type NewVideo = typeof video.$inferInsert;
