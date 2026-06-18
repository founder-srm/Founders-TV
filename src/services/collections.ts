import { and, desc, eq } from "drizzle-orm";
import { assertDb } from "@/database/db";
import { collection, video } from "@/database/schemas";

export async function getCollections() {
  const database = assertDb();
  return database.select().from(collection).orderBy(desc(collection.createdAt));
}

export async function getCollectionBySlug(slug: string) {
  const database = assertDb();
  const rows = await database
    .select()
    .from(collection)
    .where(eq(collection.slug, slug));
  return rows[0] ?? null;
}

export async function getCollectionVideos(collectionId: string) {
  const database = assertDb();
  return database
    .select({
      id: video.id,
      youtubeId: video.youtubeId,
      title: video.title,
      description: video.description,
      thumbnailUrl: video.thumbnailUrl,
      publishedAt: video.publishedAt,
      createdAt: video.createdAt,
      viewCount: video.viewCount,
      likeCount: video.likeCount,
      commentCount: video.commentCount,
      collectionId: video.collectionId,
    })
    .from(video)
    .where(and(eq(video.collectionId, collectionId), eq(video.isPublished, true)))
    .orderBy(desc(video.createdAt));
}
