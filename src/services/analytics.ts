import { and, eq, sql } from "drizzle-orm";
import { assertDb, db } from "@/database/db";
import { collectionView, video, videoView } from "@/database/schemas";

export async function trackVideoView(videoId: string, userId?: string) {
  const database = assertDb();
  try {
    await database.insert(videoView).values({
      videoId,
      userId,
    });
    await database.update(video)
    .set({
        viewCount: sql`${video.viewCount} + 1`,
    })
    .where(eq(video.id, videoId));
  }
  catch (error) {
    console.error("Error tracking video view:", error);
  }
}

export async function trackCollectionView(collectionId: string, userId?: string) {
  const database = assertDb();
  try {
    await database.insert(collectionView).values({
      collectionId,
      userId,
    });
  }
  catch (error) {
    console.error("Error tracking collection view:", error);
  }
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
