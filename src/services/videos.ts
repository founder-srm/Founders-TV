import { and, desc, eq, sql } from "drizzle-orm";
import { assertDb } from "@/database/db";
import { collection, video } from "@/database/schemas";

export async function getVideosByCollection(collectionId: string) {
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
      collectionName: collection.name,
    })
    .from(video)
    .leftJoin(collection, eq(video.collectionId, collection.id))
    .where(and(eq(video.collectionId, collectionId), eq(video.isPublished, true)))
    .orderBy(desc(video.createdAt));
}

export async function getLatestVideos(limit = 12) {
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
      collectionName: collection.name,
    })
    .from(video)
    .leftJoin(collection, eq(video.collectionId, collection.id))
    .where(eq(video.isPublished, true))
    .orderBy(desc(video.createdAt))
    .limit(limit);
}

export async function getTrendingVideos(limit = 12) {
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
      collectionName: collection.name,
    })
    .from(video)
    .leftJoin(collection, eq(video.collectionId, collection.id))
    .where(eq(video.isPublished, true))
    .orderBy(desc(video.viewCount), desc(video.likeCount))
    .limit(limit);
}

export async function getVideoById(id: string) {
  const database = assertDb();
  const rows = await database
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
      collectionName: collection.name,
    })
    .from(video)
    .leftJoin(collection, eq(video.collectionId, collection.id))
    .where(and(eq(video.id, id), eq(video.isPublished, true)));

  return rows[0] ?? null;
}

export async function searchVideos(query: string, limit = 12) {
  const database = assertDb();
  const normalized = query.trim();
  if (!normalized) {
    return [];
  }

  const searchTerm = sql`plainto_tsquery('english', ${normalized})`;

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
      collectionName: collection.name,
      rank: sql<number>`ts_rank(to_tsvector('english', coalesce(${video.title}, '') || ' ' || coalesce(${video.description}, '') || ' ' || coalesce(${collection.name}, '') || ' ' || coalesce(${collection.description}, '')), ${searchTerm})`,
    })
    .from(video)
    .leftJoin(collection, eq(video.collectionId, collection.id))
    .where(
      and(
        eq(video.isPublished, true),
        sql`to_tsvector('english', coalesce(${video.title}, '') || ' ' || coalesce(${video.description}, '') || ' ' || coalesce(${collection.name}, '') || ' ' || coalesce(${collection.description}, '')) @@ ${searchTerm}`,
      ),
    )
    .orderBy(sql`rank DESC`)
    .limit(limit);
}
