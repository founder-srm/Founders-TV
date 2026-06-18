import { and, eq } from "drizzle-orm";
import { assertDb } from "@/database/db";
import { like } from "@/database/schemas";

export async function hasLikedVideo(userId: string, videoId: string) {
  const database = assertDb();
  const rows = await database
    .select()
    .from(like)
    .where(and(eq(like.userId, userId), eq(like.videoId, videoId)));

  return rows.length > 0;
}

export async function addLike(userId: string, videoId: string) {
  const database = assertDb();
  await database.insert(like).values({ userId, videoId });
}

export async function removeLike(userId: string, videoId: string) {
  const database = assertDb();
  await database
    .delete(like)
    .where(and(eq(like.userId, userId), eq(like.videoId, videoId)));
}
