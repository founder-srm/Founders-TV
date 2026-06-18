import { and, eq, sql } from "drizzle-orm";
import { assertDb, db } from "@/database/db";
import { collectionView, videoView } from "@/database/schemas";

export async function trackVideoView(videoId: string, userId?: string) {
  const database = assertDb();
  await database.insert(videoView).values({
    videoId,
    userId,
  });
}

export async function trackCollectionView(collectionId: string, userId?: string) {
  const database = assertDb();
  await database.insert(collectionView).values({
    collectionId,
    userId,
  });
}

export async function getMostViewedVideos(limit = 10) {
  const database = assertDb();
  return database
    .select({
      videoId: videoView.videoId,
      count: sql<number>`count(*)`,
    })
    .from(videoView)
    .groupBy(videoView.videoId)
    .orderBy(sql`count(*) DESC`)
    .limit(limit);
}
